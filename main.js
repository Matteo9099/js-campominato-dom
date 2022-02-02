//  inizializzo variabili
let text = document.getElementById('text').innerHTML = "Benvenuto! seleziona una difficolta e premi play.";

// inserisco una immagine tramite JS
let img = document.createElement("img");
img.src = "img/generale_ccexpress (1).png";
let src = document.getElementById('image');
src.appendChild(img);


document.getElementById('start').addEventListener('click',play);

// creo la funzione che gestisce il gioco
function play(){

    document.getElementById('text').innerHTML="";
    document.getElementById('image').innerHTML="";

    const NUMERO_BOMBE = 16;

    console.log('Avvio del gioco');

    const gioco = document.getElementById('grid');

    // resetto il campo di gioco al click
    const gridElement = document.getElementById('grid');
    gridElement.innerHTML = "";


    const difficolta = document.getElementById('selector-difficolta').value;

    let numeroCelle;
    let celleRiga;
    const tentativi = [];

    switch(difficolta){
        case "0":
            numeroCelle = 100;
            break;
        case "1":
            numeroCelle = 81;
            break;
        case "2":
            numeroCelle = 49;
            break;
    }

    generaGrid(numeroCelle);

    const bomb = generaBombe(NUMERO_BOMBE, numeroCelle);
    console.log(bomb);


    function generaGrid(numeroCelle){
        celleRiga = Math.sqrt(numeroCelle);

        for(let i=1; i<= numeroCelle; i++){
            
            const nodo = document.createElement('div');
            nodo.classList.add('square');

            const dimensione =  `calc(100% / ${celleRiga})`;
            nodo.style.width = dimensione;
            nodo.style.height = dimensione;

            nodo.innerText = i;

            nodo.addEventListener('click', toggleClick);

            gioco.appendChild(nodo);

        }
        return true;
    }

    // creo una funzione che aggiunge una classe al click
    function toggleClick(){
        this.classList.add('clicked');
        this.removeEventListener('click',toggleClick);

        const cell = parseInt(this.innerText);

        if(bomb.includes(cell)){
            terminaGioco();
        }else{
            tentativi.push(cell);
            console.log(tentativi);
        }

    }   

    // creo una funzione che determina la fine del gioco
    function terminaGioco(){
        const square = document.querySelectorAll('.square');
        

        for(let i=0; i<square.length; i++){
            if(bomb.includes(parseInt(square[i].innerText))){
                square[i].classList.add('bomb');
                // proposta per stoppare i click dopo aver cliccato sulla bomba
                endGame = true;
            }

            square[i].removeEventListener('click', toggleClick);

        }

  
        for(let j=0; j<=tentativi.length; j++){
           document.getElementById('prese').innerHTML = "caselle azzeccate: " + tentativi.length;
           document.getElementById('rimaste').innerHTML = "caselle rimaste: " + (numeroCelle-tentativi.length-NUMERO_BOMBE);
           break;
            
          }

      
    }


    // creo una funzione che generi 16 celle contenenti una bomba
    function generaBombe(numero_bombe, numeroCelle){

        const bombeGenerate = [];

        while(bombeGenerate.length < numero_bombe){
            const bomba = getRandomNumber(1, numeroCelle);
            if(!bombeGenerate.includes(bomba)){
                bombeGenerate.push(bomba);
            }
        }
        return bombeGenerate;
    }

}

function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}