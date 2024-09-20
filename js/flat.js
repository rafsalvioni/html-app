function fixedRecord(def, rec)
{
    let res = '';
    for (let prop in def) {
        let d = def[prop];
        let val = rec[prop] ?? '';
        
        if (!(prop in rec)) {
            if ('default' in d) {
                val = d.default;
            }
            else if (d.required) {
                throw `"${prop}" nao foi informado`;
            }
        }
        
        let pad  = ' ';
        let left = false;
        let pow  = 0;
        switch (d.type) {
            case 'F':
                pow = 2;
            case 'N':
                pad  = '0';
                left = true;
                if (isNaN(val)) {
                    throw `"${prop}" deve ser numerico`;
                }
                val  = Math.round(Number(val).round(pow) * Math.pow(10, pow));
                break;
            default:
                val = String(val).replaceAll(/(\r\n|\r|\n)/g, "|");
        }
        val = String(val);
        if ('size' in d && d.size > 0) {
            if (d.cut) {
                val = val.substring(0, d.size);
            }
            if (val.length > d.size) {
                throw `Valor de "${prop}" excedeu o tamanho`;
            }
            val = left ? val.padStart(d.size, pad) : val.padEnd(d.size, pad);
            
        }
        res += val;
    }
    res += "\r\n";
    return res;
}

function fixedLine(def, line)
{
    let obj = {};
    for (let prop in def) {
        let d    = def[prop];
        let size = d.size >= 0 ? d.size : line.length;
        if (size > line.length) {
            throw 'Linha menor que o requerido';
        }
        let val  = line.substring(0, size);
        line = line.substring(size);
        
        let pow = 0;
        switch (d.type) {
            case 'F':
                pow = 2;
            case 'N':
                if (/[^\d]/.test(val)) {
                    throw `Valor de "${prop}" deve ser numerico`;
                }
                val = parseInt(val) / Math.pow(10, pow);
                break;
            default:
                val = val.trim();
        }
        obj[prop] = val;
    }
    if (line.length) {
        throw 'Sobrou Linha!';
    }
    return obj;
}

