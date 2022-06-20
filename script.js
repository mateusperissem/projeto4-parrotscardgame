let cartas = ["bobrossparrot.gif", "explodyparrot.gif", "fiestaparrot.gif", "metalparrot.gif", "revertitparrot.gif", "tripletsparrot.gif", "unicornparrot.gif"];
let pontos = 0;
let jogadas = 0;
const divConteudo = document.querySelector(".content");

let numCartas = 0;
let numCartasSelecionadas = 0;
let cartasSelecionadas = [];
let listaIndicesCartas = [];

iniciarPartida();




function iniciarPartida(){
    pontos = 0;
    jogadas = 0;
    numCartas = pedirNumCartas();
    listaIndicesCartas = criaArrayComNumsAleatoriosDuplicados(cartas.length, numCartas/2);
    listaIndicesCartas.sort(comparador); //embaralar a lista
    listaIndicesCartas.sort(comparador); //embaralar a lista
    listaIndicesCartas.sort(comparador); //embaralar a lista
    imprimeCartasNaDiv(numCartas, divConteudo);
}






function comparador() { 
	return Math.random() - 0.5; 
}

function pedirNumCartas(){
    let numValido = false;
    while (numValido === false){
        let qtdCartas = prompt("Diga quantas cartas vc quer (um número par de 4 a 14):");
        if (qtdCartas % 2 == 0 && qtdCartas >=4 && qtdCartas <= 14){
            numValido = true;
            return qtdCartas;
        }
    }
}

function imprimeCartasNaDiv(numDeCartas, div){
    div.innerHTML = "";
    for (let i=0; i<numDeCartas; i++){
        let indice = listaIndicesCartas[i];
        let nomeCarta = cartas[indice];
        div.innerHTML += `
        <div class="carta" onclick= "fliparCarta(this);" >
        <div class="front-face face" data-identifier="card">
            <img src="midia/${nomeCarta}">
        </div>
        <div class="back-face face" data-identifier="back-face">
            <img src="midia/front.png">
        </div>
        </div>
        `
    }
}

function fliparCarta(carta){
    if (numCartasSelecionadas == 0 ){
        flipar(carta);
        jogadas++;
        numCartasSelecionadas ++;
    }
    else if (numCartasSelecionadas == 1){
        const cartaJaSelecionada = document.querySelector(".selecionado");
        if (carta != cartaJaSelecionada){
            flipar(carta);
            jogadas++;
            numCartasSelecionadas ++;
        }
        
        if (numCartasSelecionadas == 2)
            setTimeout(verificarPar,1000);
                              
    } else {
        console.log("nao sei oq ta rolando aqui");
    }
}

function flipar(carta){

    carta.classList.toggle("selecionado");  
    const frente = carta.querySelector(".front-face");
    const back = carta.querySelector(".back-face"); 
    frente.classList.toggle("front-face");
    back.classList.toggle("front-face"); 
    back.classList.toggle("back-face");
    frente.classList.toggle("back-face");
}


function verificarPar(){
    const cartas = document.querySelectorAll(".selecionado");
    let carta1 = cartas[0].querySelector("img").src;
    let carta2 = cartas[1].querySelector("img").src;
    if (carta1 == carta2){
        deixaCartaDescoberta(cartas[0]);
        deixaCartaDescoberta(cartas[1]);
        marcarPonto();
    }else{
        flipar(cartas[0]);
        flipar(cartas[1]);
    }
    zerarContadorSelecionadas();
    if (pontos == numCartas/2){
        alert("Você ganhou com " + jogadas + " jogadas");
        let resposta = prompt("deseja jogar novamente?");
        if (resposta == "sim")
            iniciarPartida();
    }
}


function zerarContadorSelecionadas(){
    numCartasSelecionadas = 0;
}

function marcarPonto(){
    pontos++;
}

function deixaCartaDescoberta(carta){
    carta.classList.toggle("selecionado");
    numCartasSelecionadas  --;
    carta.removeAttribute("onclick");

}



function numeroAleatorioAteX(x){
    return Math.floor(Math.random() * x);
}
function criaArrayComNumsAleatoriosDuplicados (max, qtd){ //cria numeros aleatorios de 0 a max
    let array = [];
    for (i=0; i<qtd; i++){
        let num = numeroAleatorioAteX(max); 
        while (array.includes(num)){
            num = numeroAleatorioAteX(max);
        }
        array.push(num);
        array.push(num);
    }
    return array;
}



function criarCarta(nome){

}
