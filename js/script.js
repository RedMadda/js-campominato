// Consegna
// Il computer deve generare 16 numeri casuali tra 1 e 100. I numeri non possono essere duplicati.
var numsPc = [];
pushNums(numsPc, 16, 1, 100);
console.log(numsPc);

// In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100. L’utente non può inserire più volte lo stesso numero.

var numsUser = [];
while (numsUser.length < 5){
    var numUser = parseInt(prompt("Inserisci un numero compreso fra 1 e 100."));
    do{
        numUser = parseInt(prompt("Attenzione! Il numero scelto deve essere positivo, fra 1 e 100 e non già utilizzato. Riprova!"));
    } while (numUser <= 0 || numsUser.includes(numUser)  );
    numsUser.push(numUser);
     console.log(numUser);
 }
 console.log(numsUser);
// FUNZIONI

function pushNums(array, t, min, max){
while (array.length < t){
    var num = getRndNum(min, max);
    if (!array.includes(num)){
        array.push(num);
        }
    }
}
function getRndNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

// Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero. La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
 