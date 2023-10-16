var levelUp = new Audio("Audio/levelup.mp3");
var runSound = new Audio("Audio/run.mp3");
var jumpSound = new Audio("Audio/jump.mp3");
var deadSound = new Audio("Audio/dead.mp3");
var slideSound = new Audio("Audio/slide.wav");
var wonSound = new Audio("Audio/won.wav");


// Start - Keycheck
function keycheck(event) {
  var keycode = event.which;

  if (keycode == 13) {
    // Enter key
    if (runWorker == 0) {
        if(!jumpWorker == 0){runWorker = 0;}

        else if (!slideWorker == 0){runWorker = 0;}
        else {
        clearInterval(idleWorker);
        idleWorker = 0;
        clearInterval(slideWorker);
        slideWorker = 0;
        clearInterval(jumpWorker);
        jumpWorker = 0;
        runImageNumber = 0;
 
        runWorker = setInterval(run, 80);
        runSound.play();

        backgroundWorker = setInterval(background, 100);
        scoreWorker = setInterval(updateScore, 250);
        boxWorker = setInterval(moveBoxes, 100);
        fireWoker = setInterval(movefire, 100)

        }
    }

  }

  if (keycode == 32) {
    // Space key
    if (jumpWorker == 0) {
        clearInterval(idleWorker);
        idleWorker = 0;
        clearInterval(runWorker);
        runWorker = 0;
        clearInterval(slideWorker);
        slideWorker = 0;
        runSound.pause();

        jumpWorker = setInterval(jump, 100);
        jumpSound.play();
    }
  }

  if (keycode == 13) {
    if (slideWorker == 0) {
        if (!jumpWorker == 0){
            slideWorker = 0;
        } else {
            clearInterval(idleWorker);
            idleWorker = 0;
            clearInterval(runWorker);
            runWorker = 0;
            clearInterval(jumpWorker);
            jumpWorker = 0;
            runSound.pause();

            slideWorker = setInterval(slide, 80);
            slideSound.play();
        }
    }
  }
}

// End - Keycheck

// Start - Idle
var idleWorker = 0;
var idleImageNumber = 0;

function idle() {
  idleImageNumber = idleImageNumber + 1;

  if (idleImageNumber == 11) {
    idleImageNumber = 1;
  }

  document.getElementById("boy").src = "Image/Idle (" + idleImageNumber + ").png";
}

function idleMove() {
  idleWorker = setInterval(idle, 100);
}
// End - Idle

// Start - Run
var runImageNumber = 0;
var runWorker = 0;

function run() {
  runImageNumber = runImageNumber + 1;

  if (runImageNumber === 9) {
    runImageNumber = 1;
  }

  document.getElementById("boy").src = "Image/Run (" + runImageNumber + ").png";
}
// End - Run

// Start - Background move
var backgroundPositionX = 0;
var backgroundWorker = 0;

function background() {
  backgroundPositionX = backgroundPositionX - 20;
  document.getElementById("background2").style.backgroundPositionX = backgroundPositionX + "px";
}
// End - Background move

// Start - Jump
var jumpImageNumber = 1;
var jumpWorker = 0;
var boyMarginTop = 385;

function jump() {
  if (jumpImageNumber <= 5) {
    boyMarginTop = boyMarginTop - 30;
    document.getElementById("boy").style.marginTop = boyMarginTop + "px";
  }

  if (jumpImageNumber >= 5) {
    boyMarginTop = boyMarginTop + 30;
    document.getElementById("boy").style.marginTop = boyMarginTop + "px";
  }

  jumpImageNumber = jumpImageNumber + 1;

  if (jumpImageNumber == 10) {
    jumpImageNumber = 1;
    clearInterval(jumpWorker);
    jumpWorker = 0;
    runWorker = setInterval(run, 80);
    runSound.play();
    

    if (backgroundWorker == 0) {
      backgroundWorker = setInterval(background, 100);
    }

    if (scoreWorker == 0) {
      scoreWorker = setInterval(updateScore, 250);
    }

    if (boxWorker == 0) {
      boxWorker = setInterval(moveBoxes, 100);
    }

    if(fireWoker == 0) {
      fireWoker = setInterval(movefire, 100);
    }
  }

  document.getElementById("boy").src = "Image/Jump (" + jumpImageNumber + ").png";
}
// End - Jump

var slideImageNumber = 0;
var slideWorker = 0;

// slide start
function slide() {
  slideImageNumber = slideImageNumber + 1;

  if (slideImageNumber > 1 & slideImageNumber <= 5 ) {
    boyMarginTop = boyMarginTop + 7;
    document.getElementById("boy").style.marginTop = boyMarginTop + "px";
  }

  if (slideImageNumber >= 6 & slideImageNumber < 10 ) {
    
    boyMarginTop = boyMarginTop - 7;
    document.getElementById("boy").style.marginTop = boyMarginTop + "px";
  }

  if (slideImageNumber == 11) {
    slideImageNumber = 1;
    clearInterval(slideWorker);
    runWorker = setInterval(run, 80);
    runSound.play();
    slideWorker = 0;
    

    if (backgroundWorker == 0) {
      backgroundWorker = setInterval(background, 80);
    }

    if (scoreWorker == 0) {
      scoreWorker = setInterval(updateScore, 250);
    }

    if (boxWorker == 0) {
      boxWorker = setInterval(moveBoxes, 80);
    }

    if (fireWoker == 0) {
      fireWoker = setInterval(movefire, 80);
    }

  }
  

  document.getElementById("boy").src = "Image/Slide (" + slideImageNumber + ").png";

}



// Start - Score
var score = 0;
var scoreWorker = 0;

function updateScore() {
  score = score + 40;
  document.getElementById("score").innerHTML = score;

  if (score == 3000) {
    levelCompleted();
  }
}
// End - Score

// Start - Create boxes

var boxMarginLeft = 450;

function createBoxes() {
  for (var i = 0; i < 12; i++) {
    var box = document.createElement("div");
    box.className = "box2";
    box.id = "box2" + i;

    boxMarginLeft = boxMarginLeft + 900; 
    box.style.marginLeft = boxMarginLeft + "px";

    document.getElementById("background2").appendChild(box);
  }
}
// End - Create boxes

// Start - Move boxes
var boxWorker = 0;

function moveBoxes() {
  for (var i = 0; i < 20; i++) { 
    var newBox = document.getElementById("box2" + i);
    var boxMarginLeft = parseInt(getComputedStyle(newBox).marginLeft);
    var newBoxMarginLeft = boxMarginLeft - 20;
    newBox.style.marginLeft = newBoxMarginLeft + "px";

    if (newBoxMarginLeft >= 85 && newBoxMarginLeft <= 100) {
      if (boyMarginTop > 335 && boyMarginTop < 585) {
        clearInterval(runWorker);
        runWorker = -1;
        runSound.pause();

        clearInterval(jumpWorker);
        jumpWorker = -1;
        jumpSound.pause();

        clearInterval(slideWorker);
        slideWorker = -1;

        clearInterval(backgroundWorker);
        backgroundWorker = -1;

        clearInterval(boxWorker);
        boxWorker = -1;

        clearInterval(fireWoker);
        fireWoker = -1;

        clearInterval(scoreWorker);
        scoreWorker = -1;

        deadWorker = setInterval(dead, 100);
        deadSound.play();
      }
    }
  }
}
// End - Move boxes

// creat- create boxes
var fireMarginTop = 385;
var fireMarginLeft = 0;

function creatfire() {
  for (var i = 0; i < 30; i++) {
    var fire = document.createElement("div");
    fire.className = "fire2";
    fire.id = "fire2" + i;

    fireMarginLeft = fireMarginLeft + 900; 
    fire.style.marginLeft = fireMarginLeft + "px";

    document.getElementById("background2").appendChild(fire);
  }
}
// End - create boxes

// start - moves boxes
var fireWoker = 0;

function movefire() {
  for (var i = 0; i < 12; i++) { 
    var newfire = document.getElementById("fire2" + i);
    var fireMarginLeft = getComputedStyle(newfire).marginLeft;
    var newfireMarginLeft = parseInt(fireMarginLeft) - 20;
    newfire.style.marginLeft = newfireMarginLeft + "px";

    if (newfireMarginLeft >= 85 && newfireMarginLeft <= 100) {
      if (boyMarginTop <= 390) {
        clearInterval(runWorker);
        runWorker = -1;
        runSound.pause();

        clearInterval(jumpWorker);
        jumpWorker = -1;
        jumpSound.pause();

        clearInterval(slideWorker);
        slideWorker = -1;
        slideSound.pause();

        clearInterval(backgroundWorker);
        backgroundWorker = -1;

        clearInterval(boxWorker);
        boxWorker = -1;

        clearInterval(fireWoker);
        fireWoker = -1;

        clearInterval(scoreWorker);
        scoreWorker = -1;

        deadWorker = setInterval(dead, 100);
        deadSound.play();
      }
    }
  }
}

// Start - Dead
var deadImageNumber = 1;
var deadWorker = 0;

function dead() {
  deadImageNumber = deadImageNumber + 1;

  if (deadImageNumber == 10) {
    deadImageNumber = 1;
    document.getElementById("boy").style.marginTop = "385px";
    document.getElementById("end").style.visibility = "visible";
    document.getElementById("endscore").innerHTML = score;
  }

  document.getElementById("boy").src = "Image/Dead (" + deadImageNumber + ").png";
}
// End - Dead

// Reload
function reload() {
  location.reload();
}

// Start - Level Completed
function levelCompleted() {
  clearInterval(runWorker);
  runWorker = -1;
  runSound.pause();

  clearInterval(jumpWorker);
  jumpWorker = -1;
  jumpSound.pause();

  clearInterval(backgroundWorker);
  backgroundWorker = -1;

  clearInterval(boxWorker);
  boxWorker = -1;

  clearInterval(fireWoker);
  fireWoker = -1;

  clearInterval(scoreWorker);
  scoreWorker = -1;

  document.getElementById("boy").className = "levelCompleted";
  document.getElementById("nextlevel").style.visibility = "visible";
  wonSound.play();
}
// End - Level Completed

