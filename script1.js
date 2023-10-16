var levelUp = new Audio("Audio/levelup.mp3");
var runSound = new Audio("Audio/run.mp3");
var jumpSound = new Audio("Audio/jump.mp3");
var deadSound = new Audio("Audio/dead.mp3");

// Start - Keycheck
function keycheck(event) {
  var keycode = event.which;

  if (keycode == 13) {
    // Enter key
    if (runWorker == 0) {
      clearInterval(idleWorker);
      runWorker = setInterval(run, 100);
      runSound.play();

      backgroundWorker = setInterval(background, 100);
      scoreWorker = setInterval(updateScore, 250);
      boxWorker = setInterval(moveBoxes, 100);
    }
  }

  if (keycode == 32) {
    // Space key
    clearInterval(idleWorker);
    if (jumpWorker == 0) {
      clearInterval(runWorker);
      runSound.pause();

      jumpWorker = setInterval(jump, 100);
      jumpSound.play();
    }
  }
}

// End - Keycheck

// Start - Idle
var idleWorker = 0;
var idleImageNumber = 0;

function idle() {
  idleImageNumber = idleImageNumber + 1;

  if (idleImageNumber === 10) {
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

  if (runImageNumber == 8) {
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
  document.getElementById("background").style.backgroundPositionX = backgroundPositionX + "px";
}
// End - Background move

// Start - Jump
var jumpImageNumber = 1;
var jumpWorker = 0;
var boyMarginTop = 365;

function jump() {
  if (jumpImageNumber <= 5) {
    boyMarginTop = boyMarginTop - 30;
    document.getElementById("boy").style.marginTop = boyMarginTop + "px";
  }

  if (jumpImageNumber >= 5 ) {
    boyMarginTop = boyMarginTop + 30;
    document.getElementById("boy").style.marginTop = boyMarginTop + "px";
  }

  jumpImageNumber = jumpImageNumber + 1;

  if (jumpImageNumber == 10) {
    jumpImageNumber = 1;
    clearInterval(jumpWorker);
    runWorker = setInterval(run, 100);
    runSound.play();
    jumpWorker = 0;

    if (backgroundWorker == 0) {
      backgroundWorker = setInterval(background, 100);
    }

    if (scoreWorker == 0) {
      scoreWorker = setInterval(updateScore, 250);
    }

    if (boxWorker == 0) {
      boxWorker = setInterval(moveBoxes, 100);
    }
  }

  document.getElementById("boy").src =  "Image/Jump (" + jumpImageNumber + ").png";
}
// End - Jump

// Start - Score
var score = 0;
var scoreWorker = 0;

function updateScore() {
  score = score + 40;
  document.getElementById("score").innerHTML = score;

  if (score == 2000) {
    levelCompleted();
  }
}
// End - Score

// Start - Create boxes
function createboxes() {
  var boxMarginLeft = 200; // Initialize boxMarginLeft

  for (var i = 0 ; i < 30; i++) {
    var box = document.createElement("div");
    box.className = "box";
    box.id = "box" + i;

    // Levels
    if (i <= 5) {
      boxMarginLeft = boxMarginLeft + 600;
    } else {
      boxMarginLeft = boxMarginLeft + 400;
    }
    // End - Levels

    box.style.marginLeft = boxMarginLeft + "px";
    document.getElementById("background").appendChild(box);
  }
}
// End - Create boxes


// Start - Move boxes
var boxWorker = 0;

function moveBoxes() {
  for (var i = 0; i < 30; i++) {
    var newBox = document.getElementById("box" + i);
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

        clearInterval(backgroundWorker);
        backgroundWorker = -1;

        clearInterval(boxWorker);
        boxWorker = -1;

        clearInterval(scoreWorker);
        scoreWorker = -1;

        deadWorker = setInterval(dead, 100);
        deadSound.play();
       
       
      }
    }
  }
}
// End - Move boxes

// Start - Dead
var deadImageNumber = 1;
var deadWorker = 0;
var score = 0;

function dead() {
  deadImageNumber = deadImageNumber + 1;

  if (deadImageNumber == 10) {
    deadImageNumber = 1;
    document.getElementById("boy").style.marginTop = "375px";
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

  clearInterval(scoreWorker);
  scoreWorker = -1;

  document.getElementById("boy").className = "levelCompleted";
  document.getElementById("nextlevel").style.visibility = "visible";
  document.getElementById("CurrentScore").innerHTML = score;
  levelUp.play();
}
// End - Level Completed

