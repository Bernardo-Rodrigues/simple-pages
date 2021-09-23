var deckJogador = [];
var deckMaquina = [];
var cartaMaquina;
var cartaJogador;
var jogou;


function adicionarCartaJogador(){
  var imagemCarta = document.getElementById("link-imagem-jogador").value;
  var nomeCarta = document.getElementById("nome-carta-jogador").value;
  var ataqueCarta = document.getElementById("ataque-carta-jogador").value;
  var defesaCarta = document.getElementById("defesa-carta-jogador").value;
  var magiaCarta = document.getElementById("magia-carta-jogador").value;
  var carta = {
    nome: nomeCarta,
    imagem: imagemCarta,
    atributos: {
      ataque: ataqueCarta,
      defesa: defesaCarta,
      magia: magiaCarta
    }
  };
  deckJogador.push(carta);
  exibirDeckJogador();
}
function exibirDeckJogador(){
  var divDeckJogador = document.getElementById("deck-jogador");
  var tagHTML = "<div id='carta--jogador' class='carta--jogador'>";

  var opcoesTexto = "";
  for (var carta = 0; carta < deckJogador.length; carta++) {
    opcoesTexto += tagHTML + `<p>${deckJogador[carta].nome}</p>` + "</div>";
  }
  divDeckJogador.innerHTML = opcoesTexto;
}
function adicionarCartaMaquina(){
  var imagemCarta = document.getElementById("link-imagem-maquina").value;
  var nomeCarta = document.getElementById("nome-carta-maquina").value;
  var ataqueCarta = document.getElementById("ataque-carta-maquina").value;
  var defesaCarta = document.getElementById("defesa-carta-maquina").value;
  var magiaCarta = document.getElementById("magia-carta-maquina").value;
  var carta = {
    nome: nomeCarta,
    imagem: imagemCarta,
    atributos: {
      ataque: ataqueCarta,
      defesa: defesaCarta,
      magia: magiaCarta
    }
  };
  
  deckMaquina.push(carta);
  exibirDeckMaquina();
}
function exibirDeckMaquina(){
  var divDeckMaquina = document.getElementById("deck-maquina");
  var tagHTML = "<div id='carta--maquina' class='carta--maquina'>";

  var opcoesTexto = "";
  for (var carta = 0; carta < deckMaquina.length; carta++) {
    opcoesTexto += tagHTML + `<p>${deckMaquina[carta].nome}</p>` + "</div>";
  }
  divDeckMaquina.innerHTML = opcoesTexto;
}
function sortearCarta() {
  var divsemCarta = document.getElementById("semCarta");
  jogou = false;
  if(deckJogador.length == 0 || deckMaquina.length ==0) return divsemCarta.innerHTML = "<h2>Deck sem cartas!</h2>";
  else divsemCarta.innerHTML = "";
  var indiceCartaMaquina = parseInt(Math.random() * deckMaquina.length);
  cartaMaquina = deckMaquina[indiceCartaMaquina];
  deckMaquina.splice(indiceCartaMaquina, 1);
  console.log(deckMaquina);

  var indiceCartaJogador = parseInt(Math.random() * deckJogador.length);
  if(deckJogador.length > 1){
    while (indiceCartaMaquina == indiceCartaJogador) {
      indiceCartaJogador = parseInt(Math.random() * deckJogador.length);
    }
  }
  cartaJogador = deckJogador[indiceCartaJogador];
  deckJogador.splice(indiceCartaJogador, 1);
  console.log(deckJogador);

  exibirDeckJogador();
  exibirDeckMaquina();

  document.getElementById("btnSortear").disabled = true;
  document.getElementById("btnJogar").disabled = false;

  exibirCartaJogador();
  exibirCartaMaquina()
}
  
function exibirCartaJogador() {
  var divCartaJogador = document.getElementById("carta-jogador");
  divCartaJogador.style.backgroundImage = `url(${cartaJogador.imagem})`;
  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">';
  var tagHTML = "<div id='opcoes' class='carta-status'>";

  var opcoesTexto = "";
  for (var atributo in cartaJogador.atributos) {
    opcoesTexto +=
      "<input type='radio' name='atributo' value='" +
      atributo +
      "'>" +
      atributo +
      " " +
      cartaJogador.atributos[atributo] +
      "<br>";
  }
  var nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`;
  divCartaJogador.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>";
}

function exibirCartaMaquina() {
  var divCartaMaquina = document.getElementById("carta-maquina");
  divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.imagem})`;
  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">';
  var tagHTML = "<div id='opcoes' class='carta-status'>";
  var valorAtributo;
  
  var opcoesTexto = "";
  for (var atributo in cartaMaquina.atributos) {
    if(!jogou) valorAtributo = "?";
    else valorAtributo = cartaMaquina.atributos[atributo];
    opcoesTexto +=
      "<p type='text' name='atributo' value='" +
      atributo +
      "'>" +
      atributo +
      " " +
      valorAtributo +
      "</p>";
  }
  var nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`;
  divCartaMaquina.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>";
}

function obterAtributoSelecionado() {
  var radioAtributos = document.getElementsByName("atributo");

  for (var i = 0; i < radioAtributos.length; i++) {
    if (radioAtributos[i].checked) return radioAtributos[i].value;
  }
}

function jogar() {
  var atributoSelecionado = obterAtributoSelecionado();
  var divResultado = document.getElementById("resultado");
  var htmlResultado = "";
  jogou = true;

  var valorCartaJogador = cartaJogador.atributos[atributoSelecionado];
  var valorCartaMaquina = cartaMaquina.atributos[atributoSelecionado];

  if (valorCartaJogador > valorCartaMaquina) {
    htmlResultado = "<p class='resultado-final'>Venceu!</p>";
  } else if (valorCartaJogador < valorCartaMaquina) {
    htmlResultado = "<p class='resultado-final'>Perdeu!</p>";
  } else htmlResultado = "<p class='resultado-final'>Empatou!</p>";

  divResultado.innerHTML = htmlResultado;
  document.getElementById("btnSortear").disabled = false;
  document.getElementById("btnJogar").disabled = true;
  exibirCartaMaquina();
}


