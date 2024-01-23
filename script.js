'use strict';

/**
 * ICS4UC Final Project
 * 
 * Author: Vincent Martin
 * Description: Pacman
 * 
 */
//setting up canvas
const ctx = $("myCanvas").getContext("2d");
//event listeners
window.addEventListener("keydown", userMove);
window.addEventListener("load", updateFrame);
//map 
const grideSize = 20;
const rows = $("myCanvas").height / grideSize;
const cols = $("myCanvas").width / grideSize;
//0:empty, 1:wall, 2:chip, 3:superChip
//To reset map to original
let mapRestart = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 3, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 3, 1], [1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1], [1, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1], [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1], [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1], [1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1], [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1], [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1], [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1], [1, 2, 1, 1, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1], [1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1], [1, 2, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1], [1, 2, 1, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 1, 1, 2, 1, 1, 1], [1, 3, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 3, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
let map = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 3, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 3, 1], [1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1], [1, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1], [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1], [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1], [1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1], [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1], [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1], [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1], [1, 2, 1, 1, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1], [1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1], [1, 2, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1], [1, 2, 1, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 1, 1, 2, 1, 1, 1], [1, 3, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 3, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

//score variables
let score = 0;
let highscore = 0;
//interval to clear max td
let maxInt;
//Draws map based on number code in the array
function drawMap() {
  ctx.clearRect(0, 0, 600, 400);
  let maxtrack = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (map[row][col] == 1) {
        ctx.fillStyle = "blue";
        ctx.fillRect(20 * col, 20 * row, 20, 20);
      } else if (map[row][col] == 2) {
        maxtrack++;
        ctx.fillStyle = "yellow";
        ctx.fillRect(20 * col, 20 * row, 20, 20);
      } else if (map[row][col] == 3) {
        maxtrack++;
        ctx.fillStyle = "red";
        ctx.fillRect(20 * col, 20 * row, 20, 20);
      } else if (map[row][col] == 0) {
        ctx.fillStyle = "white";
        ctx.fillRect(20 * col, 20 * row, 20, 20);
      }

    }
  }
  if (maxtrack == 0) {
    if (score >= 2730) {//Easter Egg for Adam 2730 is the score you get if you eat all chips and eat both ghost everytime you eat a superchip 
      $("max").innerHTML = "Adam get away!!";
    } else {//To not be stuck with no possibility of getting more points
      $("max").innerHTML = "You have achieved the max score for this round!";
    }
    maxInt =  setTimeout(maxClear, 5000);
     gameEnd();
  }
}

//clearing max td
function maxClear(){
  $("max").innerHTML = "";
}


//images
const PACMAN = $("pacman");
const PACMANC = $("pacmanC");
const BGHOST = $("blueGhost");
const RGHOST = $("redGhost");
const EGHOST = $("eGhost");

// Keys
const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;
const A = 65;
const D = 68;
const S = 83;
const W = 87;
//

//variable for timeout
let superChipInt;

function $(id) {
  return document.getElementById(id);
}

class Pacman {
  superChip = false;
  lives = 3;
  direction; // 0 = left, 1 = up, 2 = right, 3 = down
  mouthOpen = false;
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }
  draw() {//alternates between pacman having his mouth open or closed 
    if (this.mouthOpen) {
      ctx.drawImage(PACMAN, this.x, this.y, this.width, this.height);
      this.mouthOpen = false;
    } else {
      ctx.drawImage(PACMANC, this.x, this.y, this.width, this.height);
      this.mouthOpen = true;
    }
  }
  move() {//takes value from direction performs check and executes
    if (this.direction == 0) {
      this.x -= 5;
      if (map[round(this.y / 20)][round((this.x - 7) / 20)] == 1) {
        this.x += 5
      }
    }
    if (this.direction == 1) {
      this.y -= 5;
      if (map[round((this.y - 7) / 20)][round(this.x / 20)] == 1) {
        this.y += 5
      }
    }
    if (this.direction == 2) {
      this.x += 5;
      if (map[round(this.y / 20)][round((this.x + 5) / 20)] == 1) {
        this.x -= 5
      }
    }
    if (this.direction == 3) {
      this.y += 5;
      if (map[round((this.y + 5) / 20)][round(this.x / 20)] == 1) {
        this.y -= 5
      }
    }
    //check for superChip
    if (map[round(this.y / 20)][round(this.x / 20)] == 3) {
      this.superChip = true;
      bGhost.edible = true;
      rGhost.edible = true;
      //score update
      score += 20;
      $("score").innerHTML = score;
      if (score > highscore) {
        highscore += 20;
        $("highScore").innerHTML = highscore;
      }
      //10 seconds of superChip effects
      superChipInt = setTimeout(superChipEnd, 10000);
    }
    //check for chip
    if (map[round(this.y / 20)][round(this.x / 20)] == 2) {
      //score update
      score += 10;
      $("score").innerHTML = score;
      if (score > highscore) {
        highscore += 10;
        $("highScore").innerHTML = highscore;
      }
    }
    //sets gridBox to empty 
    map[round(this.y / 20)][round(this.x / 20)] = 0;
  }
}

function superChipEnd() {
  pacman.superChip = false;
  //resets ghost to non edible
  bGhost.edible = false;
  rGhost.edible = false;
}

class Ghost {
  edible = false;
  direction;
  constructor(x, y, h, w, i) {
    this.x = x;
    this.y = y;
    this.height = h;
    this.width = w;
    this.image = i;
  }
  draw() {
    //if ghosts are edible the edible ghost is drawn
    if (this.edible == true) {
      ctx.drawImage(EGHOST, this.x, this.y, this.width, this.height);
    } else {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }
  move() {//takes value from direction performs check and executes
    if (this.direction == 0) {
      this.x -= 5;
      if (map[round(this.y / 20)][round((this.x - 7) / 20)] == 1) {
        this.x += 5
      }
    }
    if (this.direction == 1) {
      this.y -= 5;
      if (map[round((this.y - 7) / 20)][round(this.x / 20)] == 1) {
        this.y += 5
      }
    }
    if (this.direction == 2) {
      this.x += 5;
      if (map[round(this.y / 20)][round((this.x + 5) / 20)] == 1) {
        this.x -= 5
      }
    }
    if (this.direction == 3) {
      this.y += 5;
      if (map[round((this.y + 5) / 20)][round(this.x / 20)] == 1) {
        this.y -= 5
      }
    }
    //checks for colisions with pacman
    if ((round(this.y / 20) == round(pacman.y / 20)) && (round(this.x / 20) == round(pacman.x / 20))) {
      //checks if superChip is active
      if (this.edible == true) {
        //resets position of ghosts
        this.x = 240;
        this.y = 160;
        score += 50;
        $("score").innerHTML = score;
        if (score > highscore) {
          highscore += 50;
          $("highScore").innerHTML = highscore;
        }
        this.edible = false;
      } else {
        //resets pacman's position
        pacman.x = 80;
        pacman.y = 160;
        pacman.lives--;
        $("lives").innerHTML = pacman.lives;
      }
    }
  }
}

function updateFrame() {
  drawMap();
  pacman.draw();
  bGhost.draw();
  rGhost.draw();
  if (pacman.lives < 1) {
    gameEnd();
  }
}



//takes in user actions and reacts
function userMove(event) {
  if ((event.keyCode == UP) || (event.keyCode == LEFT) || (event.keyCode == RIGHT) || (event.keyCode == DOWN)) {
    event.preventDefault();
  }
  if (event.keyCode == W || event.keyCode == UP) {
    pacman.direction = 1
  }
  if (event.keyCode == A || event.keyCode == LEFT) {
    pacman.direction = 0;
  }
  if (event.keyCode == D || event.keyCode == RIGHT) {
    pacman.direction = 2;
  }
  if (event.keyCode == S || event.keyCode == DOWN) {
    pacman.direction = 3;
  }
  requestAnimationFrame(playLoop);
  playLoop();
}

//Play loop for movement
const FPS = 10;
const FRAME_TIME = (1000 / 60) * (60 / FPS) - (1000 / 60) * 0.5;
let last_frame = 0;
let times = 0;
function playLoop() {
  let td = performance.now() - last_frame;
  if (td >= FRAME_TIME) {
    pacman.move();
    if (times % 2 == 0) {
      //chages direction for ghosts
      bGhost.direction = randGhost(bGhost);
      rGhost.direction = randGhost(rGhost);
    }
    bGhost.move();
    rGhost.move();
    last_frame = performance.now();
    updateFrame();
    times++;
  }
  requestAnimationFrame(playLoop)
}

//ghost movements
function randGhost(caller) {
  let can = [];
  let cannot;
  //checks for what direction ghosts can go
  if (map[round((caller.y / 20) + 1)][round(caller.x / 20)] != 1) {
    can.push(3);
  }
  if (map[round((caller.y / 20) - 1)][round(caller.x / 20)] != 1) {
    can.push(1);
  }
  if (map[round((caller.y / 20))][round((caller.x / 20) + 1)] != 1) {
    can.push(2);
  }
  if (map[round((caller.y / 20))][round((caller.x / 20) - 1)] != 1) {
    can.push(0);
  }
  let min = 0
  let max = Math.floor(can.length - 1);
  let d = 0;
  //if more then one direction is possible stops ghosts from going backwards
  if (can.length > 1) {
    if (caller.direction == 0) {
      cannot = 2;
    }
    if (caller.direction == 1) {
      cannot = 3;
    }
    if (caller.direction == 2) {
      cannot = 0;
    }
    if (caller.direction == 3) {
      cannot = 1;
    }
    d = Math.floor(Math.random() * (max - min + 1) + min);
    while (can[d] == cannot) {
      d = Math.floor(Math.random() * (max - min + 1) + min);
    }
  }
  return can[d];
}

function round(value, decimals = 0) {
  return Math.round((value + Number.EPSILON) * 10 ** decimals) / 10 ** decimals;
}

//resets variables and restarts the game
function gameEnd() {
  pacman.x = 80;
  pacman.y = 160;
  bGhost.x = 240;
  bGhost.y = 160;
  rGhost.x = 280;
  rGhost.y = 160;
  score = 0;
  times = 0;
  pacman.superChip = false;
  bGhost.edible = false;
  rGhost.edible = false;
  pacman.lives = 3;
  $("lives").innerHTML = pacman.lives;
  $("score").innerHTML = score;
  //resets the map
  for (let i = 0; i < mapRestart.length; i++) {
    for (let q = 0; q < mapRestart[i].length; q++) {
      map[i][q] = mapRestart[i][q];
    }
  }
  drawMap();
  requestAnimationFrame(playLoop);
}

//creats the respective objects
const pacman = new Pacman(80, 160, 20, 20);
const bGhost = new Ghost(240, 160, 20, 25, BGHOST);
const rGhost = new Ghost(280, 160, 20, 20, RGHOST);