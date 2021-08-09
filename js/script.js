/*

 La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
BONUS: (da fare solo se funziona tutto il resto) all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali: con difficoltà 0 => tra 1 e 100 con difficoltà 1 => tra 1 e 80 con difficoltà 2 => tra 1 e 50 */

//  Il computer deve generare 16 numeri casuali tra 1 e 100. I numeri non possono essere duplicati.

// bonus
var chances;

function update() {
  var select = document.getElementById("level");
  var option = select.options[select.selectedIndex];
  
  if(option.value == 0 || option.value == 1){
    chances = 100;
  } else if (option.value == 2){
    chances = 80;
  } else {
    chances = 50;
  }

    var numsPc = [];

    var i = 0;
    while(i < 16){
    numPc = Math.floor(Math.random() * 100) + 1;
    if(!numsPc.includes(numPc)){
    numsPc.push(numPc)
    } else{
    i--
    }
    i++
    }
    console.log("NumsPc: ", numsPc);

    // In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100. L’utente non può inserir e più volte lo stesso numero.
    // Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.

    var numsUtente = [];
    var check = false;
    // chiedo numeri utente con controllo doppioni e lista nera

    for (var i = 0; i < chances && check == false; i++){
    var numUtente = prompt("Inserisci un numero fra 1 e 100. Non puoi ripeterlo.");
    if(numsUtente.includes(numUtente) || isNaN(numUtente) || numUtente == " " || numUtente == ""){
    alert("Numero già scelto o non valore non valido, riprova!");
    i--;
    } 
    else{
    numsUtente.push(numUtente);

    var singPlur;
    if(numsUtente.length == 1){
      singPlur = "tentativo";
    } else {
      singPlur = "tentativi";
    }

    document.getElementById("messaggio").innerHTML="Sei vivo! hai fatto " +  numsUtente.length + " " + singPlur;

    for(var j = 0; j < numsPc.length && check == false; j++){
      if(numsPc[j] == numUtente){
        // console.log("Numero bomba!");
        document.getElementById("messaggio").innerHTML="Peccato, hai trovato una bomba! Hai perso al tentativo numero " + numsUtente.length + ".";
        check = true;
      } else if(numsUtente.length == chances){
        document.getElementById("messaggio").innerHTML = "Hai vinto!!"
      }
    }
    // console.log(numsUtente);
    }
    }
}




