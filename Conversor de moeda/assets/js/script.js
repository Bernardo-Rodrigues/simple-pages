function ConverterParaReal(){
    var valorElemento = parseFloat(document.getElementById("valor").value);
    var valorEmReal = valorElemento * 5;
    
    var elementoValorConvertido = document.getElementById("valorConvertido");
    var valorConvertido = "O resultado em real é R$ " + valorEmReal;
    elementoValorConvertido.innerHTML = valorConvertido;
  }
  function ConverterParaEuro(){
    var valorElemento = parseFloat(document.getElementById("valor").value);
    var valorEmReal = valorElemento * 6.24;
    
    var elementoValorConvertido = document.getElementById("valorConvertido");
    var valorConvertido = "O resultado em euros é € " + valorEmReal;
    elementoValorConvertido.innerHTML = valorConvertido;
  }