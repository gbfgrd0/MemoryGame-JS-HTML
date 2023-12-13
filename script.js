const FRONT = "carta-front";
const BACK = "carta-back";
const BOARD = "container";
const CARTA = "carta";
let lockMode = false;
let PrimeiraCarta = null;
let SegundaCarta = null;

let tecnologias = [
    'bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react'
];

var CartasJogo = null;

IniciarJogo()
CheckGameOver()

function IniciarJogo(){
    CartasJogo = criarCarta(tecnologias);
    Embaralhar(CartasJogo)
    IniciarCartas(CartasJogo)
    

}

function IniciarCartas(cartas){
    let container = document.getElementById(BOARD);

    for(let carta of cartas){
        let ElementoCarta = document.createElement('div');
        ElementoCarta.id = carta.id;
        ElementoCarta.classList.add(CARTA);
        ElementoCarta.dataset.icon = carta.imagem;

        CriarConteudo(carta, ElementoCarta);

        ElementoCarta.addEventListener('click',VirarCarta)
        container.appendChild(ElementoCarta)
    };
}

function CriarConteudo(carta, ElementoCarta){

    CriarFace(FRONT, carta, ElementoCarta);
    CriarFace(BACK, carta, ElementoCarta);
}

function CriarFace(face, carta, elemento){
    let ElementoFace = document.createElement('div');
    ElementoFace.classList.add(face);
    ElementoFace.id = carta.id;

    if(face === FRONT){
      let ElementoIcone = document.createElement('img');
      ElementoIcone.src = "./imagens/ponto-removebg-preview.png";
      ElementoFace.appendChild(ElementoIcone);
    }else{
        let ElementoIcone = document.createElement('img');
        ElementoIcone.src = "./imagens/" + carta.imagem + ".png";
        ElementoFace.appendChild(ElementoIcone);
    }
    elemento.appendChild(ElementoFace)
}

function Embaralhar(Cartas){
    let IndexOrign = Cartas.length;
    let IndexRandom = 0;

    while(IndexOrign !== 0){

        IndexRandom = Math.floor(Math.random() * IndexOrign);
        IndexOrign--;

    [CartasJogo[IndexRandom], CartasJogo[IndexOrign]] = [CartasJogo[IndexOrign], CartasJogo[IndexRandom]]
    }
}

function criarCarta(tecnos){
    let cartas = [];

    for(let tec of tecnos ){
        cartas.push(CriarPares(tec))
    }

    cartas = cartas.flatMap(pair => pair);

    return cartas

}

function CriarPares(tec){
    return [
        {
            id: criarId(tec),
            imagem: tec,
            flipped: false

        },{
            id: criarId(tec),
            imagem: tec,
            flipped: false
        }
    ]
}

function criarId(tec){
    return tec + parseInt(Math.random() * 10);
}

function VirarCarta(evento){

    if(setCard(this.id)){
    this.classList.add("flip");

    if(SegundaCarta){
    if(CheckVencedor()){
        ClearCartas();
        if(CheckGameOver()){
            let FimDeJogo = document.getElementById("GameOver");
            FimDeJogo.style.display = 'flex';
        };
        
    }else{
        setTimeout(()=>{
        let ViewCartaUm = document.getElementById(PrimeiraCarta.id);
        let ViewCartaDois = document.getElementById(SegundaCarta.id);

        ViewCartaUm.classList.remove("flip");
        ViewCartaDois.classList.remove("flip");
        UnflipCarta()
        }, 500)
    }
    }
    }
}

function setCard(id){
    let carta = CartasJogo.filter(carta => carta.id===id)[0];

    if(CartasJogo.flipped || lockMode){
        return false;
    }

    if(!PrimeiraCarta){
        PrimeiraCarta = carta;
        PrimeiraCarta.flipped = true;
        return true
    }else{
        SegundaCarta = carta;
        SegundaCarta.flipped = true;
        lockMode = true;
        return true
    }
}

function CheckVencedor(){
    if(!PrimeiraCarta || !SegundaCarta){
        return false
    }
    return PrimeiraCarta.imagem === SegundaCarta.imagem;
    
}

function ClearCartas(){
    PrimeiraCarta = null;
    SegundaCarta = null;
    lockMode = false;
}

function UnflipCarta(){
    PrimeiraCarta.flipped = false;
    SegundaCarta.flipped = false;
    ClearCartas()
}

function CheckGameOver(){
    if (CartasJogo.filter(card=>!card.flipped).length == 0){
        return true
        console.log("true")
    }
}  

function Restart(){
    location.reload()
}