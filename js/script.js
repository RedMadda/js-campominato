 // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// ***game

new Vue({
  el : '#app',
  template : `
  <flower-game 
    id="game"
    :duration="100"
    :speed="5"
    :width="800"
    :height="600"
  /> 
`,
  components : {
    FlowerGame
  } 

  // flowerGame Component [game logic, no scoreboard and also no display the flowers on screen--> delegate to other components to cleaness]:
  


})




data () {
  return {
    started : false,
    currentScore : 0,
    timeRemaining : 0,
    flowerId : 0,
    timerId : null,
    liveFlowers : {},
    flowerTimerId : null
  }
}

// game component
const FlowerGame = {
  
  components : {
    Flower,
    ScoreBoard
  }




// take html id app
new Vue({
  el : '#app',
  template : `
  <flower-game
    id="game"
    :duration="100"
    :speed="5"
    :width="800"
    :height="600"
  />
`,
  components : {
    FlowerGame
  }
})

// dumb child flower component, passing infos to the parent

const Flower = {
  
  props : {
    flower : {
      type : Object,
      required : true
     }
  }
  
  methods : {
    
    flowerClicked () {
      this.$emit('clicked');
    }
    
  }
  
  template : `
  <button 
    :style="{ left: flower.x + 'px', top : flower.y + 'px'}"
    @click="flowerClicked"
    class="flower  btn">🌸
  </button>
`
  
}

// score board

const ScoreBoard = {
  
  props : {
    score : {
      type : Number,
      required : true
    },
    timeRemaining : {
      type : Number,
      required : true
    }
  }
  
  template :
  <div class="scoreboard">

    <span>Score: {{ score }}</span>
    <span>Time: {{ timeRemaining }}</span>

  </div>

}



}

