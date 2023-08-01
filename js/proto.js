Number.prototype.round = function(s=0)
{
    return Number(this.toFixed(s));
}
    
Number.fromMoney = function(valor, neg=false)
{
    valor = valor.replace('.', '');
    valor = valor.replace(',', '.');
    valor = Number(valor);
    if (neg && valor > 0.0) valor *= -1;
    return valor;
}

function download(content, fileName)
{
    const url = 'data:text/plain;base64,' + btoa(content);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;
    a.click();
}
