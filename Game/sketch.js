var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 400;
var PADDLE_WIDTH = 10;
var PADDLE_HEIGHT = 50;
var BALL_RADIUS = 10;

var xLEFT = 20;
var yLEFT = CANVAS_HEIGHT/2 - PADDLE_HEIGHT;
var yVelocityLEFT = 0;

var xRIGHT = CANVAS_WIDTH - 20 - PADDLE_WIDTH;
var yRIGHT = CANVAS_HEIGHT/2 - PADDLE_HEIGHT;
var yVelocityRIGHT = 0;

var xBALL = CANVAS_WIDTH/2 - BALL_RADIUS;
var yBALL = CANVAS_HEIGHT/2 - BALL_RADIUS;
var xBVelocity;
var yBVelocity;
var gameON = false;
var xVelocities = [-3, 3];
var yVelocities = [-3, 3];

function setup() {
  xBVelocity = random(xVelocities);
  yBVelocity = random(yVelocities);
  createCanvas(CANVAS_WIDTH,CANVAS_HEIGHT);
  rect(xBALL, yBALL, BALL_RADIUS, BALL_RADIUS);
  mainState();
  frameRate(60);
}

function draw() {
  if (gameON){
    gameState();
  }
}

function pointCount(){
  if(xBALL < xLEFT - 10){
    xBALL = CANVAS_WIDTH/2 - BALL_RADIUS;
    yBALL = CANVAS_HEIGHT/2 - BALL_RADIUS;
    //yLEFT = CANVAS_HEIGHT/2 - PADDLE_HEIGHT;
    //yRIGHT = CANVAS_HEIGHT/2 - PADDLE_HEIGHT;
    xBVelocity = random(xVelocities);
    yBVelocity = random(yVelocities);
    RPoint++;
    RwaitCount = 20;
  } else if (xBALL + BALL_RADIUS > xRIGHT + PADDLE_WIDTH + 10){
    xBALL = CANVAS_WIDTH/2 - BALL_RADIUS;
    yBALL = CANVAS_HEIGHT/2 - BALL_RADIUS;
    //yLEFT = CANVAS_HEIGHT/2 - PADDLE_HEIGHT;
    //yRIGHT = CANVAS_HEIGHT/2 - PADDLE_HEIGHT;
    xBVelocity = random(xVelocities);
    yBVelocity = random(yVelocities);
    LPoint++;
    LwaitCount = 20;
  }
}

function keyPressed(){
  if (keyCode === UP_ARROW ){
    yVelocityRIGHT = -5;
  } else if (keyCode === DOWN_ARROW){
    yVelocityRIGHT = 5;
  } else if (keyCode == 87) {
    yVelocityLEFT = -5;
  } else if (keyCode == 83 ) {
    yVelocityLEFT = 5;
  } else if (keyCode == 13) {
    gameON = true;
    LPoint = 0;
    RPoint = 0;
    loop();
  } else if (keyCode == 16) {
    noLoop();
  } else if (keyCode == 8){
    mainState();
    gameON = false;
  } else if (keyCode == 191){
    loop();
  }
}

function checkLEFTRIGHT(){
  if (yRIGHT > CANVAS_HEIGHT - PADDLE_HEIGHT){
    yVelocityRIGHT = 0;
    yRIGHT = CANVAS_HEIGHT - PADDLE_HEIGHT - 2;
  } else if (yRIGHT < 0) {
    yVelocityRIGHT = 0;
    yRIGHT = 2;
  }
  if (yLEFT > CANVAS_HEIGHT - PADDLE_HEIGHT){
    yVelocityLEFT = 0;
    yLEFT = CANVAS_HEIGHT - PADDLE_HEIGHT - 2;
  } else if (yLEFT < 0){
    yVelocityLEFT = 0;
    yLEFT = 0;
  }
}

function alternateCollision(){
  if (xBALL < xLEFT + PADDLE_WIDTH && xBALL > xLEFT
  && yBALL + BALL_RADIUS >= yLEFT && yBALL + BALL_RADIUS <= yLEFT + PADDLE_HEIGHT){
    if (yVelocityLEFT >= 0){
      xBVelocity = -xBVelocity;
      xBALL = xLEFT + PADDLE_WIDTH;
    } else if (yVelocityLEFT < 0){
      xBVelocity = -xBVelocity;
      yBVelocity = -yBVelocity;
      xBALL = xLEFT + PADDLE_WIDTH;
    }
  }
  if (xBALL + BALL_RADIUS > xRIGHT && xBALL + BALL_RADIUS < xRIGHT + PADDLE_WIDTH
  && yBALL + BALL_RADIUS >= yRIGHT && yBALL <= yRIGHT + PADDLE_HEIGHT){
    if (yVelocityRIGHT >= 0){
      xBVelocity = -xBVelocity;
      xBALL = xRIGHT - BALL_RADIUS;
    } else if (yVelocityRIGHT < 0){
      xBVelocity = -xBVelocity;
      yBVelocity = -yBVelocity;
      xBALL = xRIGHT - BALL_RADIUS;
    }
  }
  if (yBALL < 0){
    yBVelocity = -yBVelocity;
  }else if (yBALL > CANVAS_HEIGHT - BALL_RADIUS) {
    yBVelocity = -yBVelocity;
  }

}

function checkWin(){
  if (LPoint > MAX_SCORE){
    fill(78, 226, 236);
    text("LEFT player wins", CANVAS_WIDTH/2 - 115, CANVAS_HEIGHT/2 - 10);
    fill(255);
    noLoop();
  } else if (RPoint > MAX_SCORE){
    fill(78, 226, 236);
    text("RIGHT player wins", CANVAS_WIDTH/2 - 115, CANVAS_HEIGHT/2 - 10);
    fill(255);
    noLoop();
  }
}
