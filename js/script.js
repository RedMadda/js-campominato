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

new Vue(
  el = '#app',
  template = `
  <flower-game 
    id="game"
    :duration="100"
    :speed="5"
    :width="800"
    :height="600"
  /> 
`,
components = { 
  FlowerGame
},
// flowerGame Component [game logic, no scoreboard and also no display the flowers onscreen--> delegate to other components to makes things a little bit neater]:

// I made it global, even if I know that they're evil.
//  Remember that was 'const' before 
 FlowerGame = {

  components : {
    Flower,
    ScoreBoard
  },
});

// props --> how we pass data to our component
props : {
  duration : {
    type : Number,
    required = false,
     default : 60,
  },
  speed : { // A lower number makes the game faster (and therefore harder)
    type : Number,
    required : false,
    default : 5
  },
  width : {
    type: Number,
    required : false,
    default : 800
  },
  height : {
    type : Number,
    required : false,
    default : 600
  }
},

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

methods : {
  start () {
    
    // First, Reset the game to the defaults
    // the `started` flag determines if we're 
    // in a game or waiting for a player to begin
    this.started = true;
    
    // Reset any previous high-scores in anticipation
    // of the player successfully clicking on a flower
    this.currentScore = 0;
    
    // We specified the duration of the game as a prop
    // in this case, the value in seconds. As we want
    // to show a timer counting down. We set the propery
    // used to track the time that is left until the game
    // ends to match that of the expected game length (duration)
    this.timeRemaining = this.duration;
    
    // The flowers array will allow us to maintain a reference to 
    // many flower objects, but at the start of the game, it should
    // be empty
    this.liveFlowers = {};
    
    // To display the flowers, we use a v-for loop and best
    // practice demands a unique value for the :key setting.
    // This allows Vue to prioritise it's DOM updates but at
    // that start of the game, we have no flowers so we set this
    // to 0.
    this.flowerId = 0;
    
    // Start the Game timer
    this.startTimer();
          
    // Start the Game!
    this.startGame();
  },
  
  startTimer () {
    
    // We use the setInterval function here
    // to update the time as displayed on screen.
    // We store the timerId value as we need to 
    // use that to stop the setInterval function
    // from happening when the timeRemaning equals zero
    
    this.timerId = setInterval(() => {
      
      // By using the arrow function we retain access
      // to the parent scope (in this case the Vue
      // component the code is running inside) so we
      // can decrement the `timeRemaining` property.
      // This is passed to the <score-board /> component
      // via a "prop" and is updated each time this function runs.
      // NOTE we check the value before we decrement because
      // we want the `timeRemaining` to reach zero before the 
      // game is halted...
      
      if (this.timeRemaining === 0) {
        this.stopGame();
      }
      this.timeRemaining -= 1;
      
    }, 1000); /// 1000 here is 1000ms or 1 second.
  },
  
  startGame () {
    
    // As the game involves adding "flowers" to the screen
    // and issuing points when a user clicks on them, we need
    // to think about how we might achieve this in code.
    // JavaScript allows us to create objects, and this 
    // provides a good structure for modelling the information
    // required about a flower to make the game work
    
    // Fundamentally, this is going to require some logic
    // that can add a new flower to the page, along with 
    // some logic that determines what happens when a flower
    // has been clicked on. 
 
    // Also, in order to make the game interesting it would
    // be nice to use some randomness in relation to where
    // the flower appears, how long it stays displayed for
    // before dissapearing and how many points you get when
    // you click on one. We don't really care what a flower
    // looks like, or how it behaves, because we've handed 
    // over control of that to the <flower /> component
    // Also, we have a prop called "speed" which controls the rate
    // at which new flowers are added. The lower the number,
    // the slower the flowers are added, and the longer they
    // appear on the screen. 
    
    this.addFlowers();
  },
  
  addFlowers () {
    
      // This part of the game logic is responsible
      // for ensuring that there is a steady stream
      // of flowers being added to the game for the 
      // user to interact with. 
    
      // First, create a new "flower" which is represented
      // by an object, and provides information about where 
      // the flower should be positioned and what score it
      // contributes if the user manages to click it.
    
      const flower = this.createFlower();
    
      // Next, to make the game fun, we randomise how long
      // the flower should stay on the screen for. We are
      // able to use the speed prop, the lower the number,
      // the faster the flower will dissapear but to make
      // sure the player has some chance, we set a minimum
      // value of 1000ms (or one second)
    
      const durationOnScreenInMS = Math.max(getRandomInt(this.speed) * 1000, 1000);
    
      // Next, we need to get this flower displayed so to do
      // that, we push it into the flowers array and let Vue
      // work out that it needs to update the DOM with the 
      // new <flower /> component HTML
    
      //this.flowers.push(flower);
      Vue.set(this.liveFlowers, flower.id, flower);
    
      // Next, we use the value we created which instructs the game
      // how long to leave the flower on the screen before it's removed.
      // We use a setTimeout for this and we call the same function that 
      // is called if a user manages to click the flower, with the main
      // difference being we pass a second argument that instructs the 
      // `removeFlower` button that the user did not manage to click it
      // in time.
    
      setTimeout(() => {
        
        this.removeFlower(flower, true);
        
      }, durationOnScreenInMS);
    
    // Finally, we use another timer to call this function again so
    // we continue to add flowers to the screen. Again we're using the
    // speed property to determine how quickly the flowers should appear
    
    this.flowerTimerId = setTimeout(this.addFlowers, 100 * this.speed);

  },
  
  removeFlower (flower, userFailedToClick = false) {
    
    if (userFailedToClick !== true) {
      // This means that the user was able to click the flower.
      // so we need to determine the score for this flower and
      // add this to the total before removing it.
      
      this.currentScore += flower.value;
     
    }
    
    //delete this.liveFlowers[flower.id];
    Vue.delete(this.liveFlowers, flower.id);
    /*
    const index = this.flowers.findIndex(f => f.id === flower.id);
    this.flowers.splice(index, 1);
    */
    
  },
  
  stopGame () {
    clearInterval(this.timerId);
    this.timerId = null;
    this.started = false;
  },
  
  createFlower () {
    
    // This function is responsble for creating
    // an object that contains all of the information
    // required to model the Flower. In order to create
    // some variation, we can use a Random function to 
    // determine the flowers position and the score you
    // get if you're able to click on it. 
    
    return {
      id : ++ this.flowerId,
      x : getRandomInt(this.width),
      y : getRandomInt(this.height),
      value : (1 + getRandomInt(9))* 100
    }
  },
  
  flowerHasBeenClicked (flower) {
    
  }
},

computed : {
    flowers () {
      return Object.values(this.liveFlowers);
    }
},

template : `

<!-- 
Use an inline style to set 
the width and the height of 
the game. This is important
because we need to know the 
boundaries when we position 
the flowers. however there are
lots of ways of doing the same
thing and an example of a different
approach would be to use absolute
positioning and percentate top and
left values to place the flowers 
in the game screen...
-->
<div :style="{ 
width : width + 'px', 
height : height + 'px'}"
>

<!-- 
  Show this screen while 
  we're waiting for the 
  user to click START 
-->
<div class="waiting" v-if="!started">
  <h2>Flower Game</h2>
  <button 
    class="btn" 
    @click="start">Click To Play
  </button>
</div>
<div v-else>
  <!-- Else... Play the Game! -->

  <score-board 
    :score="currentScore"
    :time-remaining="timeRemaining" 
  />

  <!-- 
    Make the Flowers appear.
    Here, we pass a "flower" object to this
    component and also listen for a custom "clicked"
    event, which is an instruction the flower has been
    clicked and needs to be removed from the screen.
    We ensure each "flower" has a unique ID so that Vue
    can maximise the efficiency in which it updates the DOM
  -->
  <transition name="fade">
    <flower 
      v-for="flower in flowers" 
      :key="flower.id" 
      :flower="flower" 
      @clicked="removeFlower(flower, false)"
    />
  </transition>

</div>
</div>

);
// *END main Vue app / root;
