// Consegna
// Il computer deve generare 16 numeri casuali tra 1 e 100. I numeri non possono essere duplicati.
var numsPc = [];
pushNumsPc(numsPc, 16, 1, 100);
console.log(numsPc);

// In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100. L’utente non può inserire più volte lo stesso numero.
// Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero. La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
var numsUser = [];
pushNumsUser(numsUser, 5, numsPc);

// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.

 

// FUNZIONI

function pushNumsPc(array1, t, min, max){
while (array1.length < t){
    var num = getRndNum(min, max);
    if (!array1.includes(num)){
        array1.push(num);
    }
    }
}
function getRndNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function pushNumsUser(array1, t, array2){
    var lighter = true;
    while (array1.length < t && lighter){
    do{
        var numUser = parseInt(prompt("Attenzione! Scegli un numero positivo, fra 1 e 100 e non già utilizzato."));
    } while (numUser <= 0 || numsUser.includes(numUser)  );

    if (array2.includes(numUser)){
        alert("Mi dispiace, hai perso!");
        console.log("Numero tentativi: " + array1.length);
        lighter = false;
    }
    console.log(numsUser);
    array1.push(numUser);
    }
}


 