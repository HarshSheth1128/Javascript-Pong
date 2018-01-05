var LPoint = 0;
var RPoint = 0;
var MAX_SCORE = 5;

function mainState(){
      clear();
      var c = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      background(51);
      push();
      startPage();
      xBALL = CANVAS_WIDTH/2 - BALL_RADIUS;
      yBALL = CANVAS_HEIGHT/2 - BALL_RADIUS;
      yLEFT = CANVAS_HEIGHT/2 - PADDLE_HEIGHT;
      yRIGHT = CANVAS_HEIGHT/2 - PADDLE_HEIGHT;
      xBVelocity = random(xVelocities);
      yBVelocity = random(yVelocities);

  }
var LwaitCount = 0;
var RwaitCount = 0;
function gameState(){
    checkLEFTRIGHT();
    yRIGHT += yVelocityRIGHT;
    yLEFT += yVelocityLEFT;
    xBALL += xBVelocity;
    yBALL += yBVelocity;
    background(51);
    rect(xBALL, yBALL, BALL_RADIUS, BALL_RADIUS);
    rect(xRIGHT, yRIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);
    rect(xLEFT, yLEFT, PADDLE_WIDTH, PADDLE_HEIGHT);
    textSize(30);
    text(LPoint, 50, 30);
    text(RPoint, CANVAS_WIDTH - 60, 30);
    stroke(255);
    line(10, 0, 10, CANVAS_HEIGHT);
    line(xRIGHT + PADDLE_WIDTH + 10, 0, xRIGHT + PADDLE_WIDTH + 10, CANVAS_HEIGHT);
    if (LwaitCount > 0){
      fill(50,205,50);
      text("+1", 32, 60);
      LwaitCount--;
    } else if (RwaitCount > 0){
      fill(50,205,50);
      text("+1", CANVAS_WIDTH - 80, 60);
    }
    fill(255);
    //console.log(mouseX);
    alternateCollision();
    pointCount();
    checkWin();
    //console.debug(dist(xLEFT+PADDLE_WIDTH,yLEFT + PADDLE_HEIGHT/2, xBALL, yBALL));
    //console.debug(xBALL);
  }

function startPage(){
    var string = "PONG";
    textSize(80);
    fill(255);
    text(string, CANVAS_WIDTH/2 - 200, CANVAS_HEIGHT/2 - 100, 200, 100);
    textSize(30);
    text("Start", CANVAS_WIDTH/2 - 200, CANVAS_HEIGHT/2 + 25);
    rect(CANVAS_WIDTH/2 - 125, CANVAS_HEIGHT/2, 25, 25);
    textSize(15);
    text("Instructions:" , CANVAS_WIDTH/2 - 200, CANVAS_HEIGHT/2 + 45, 150);
    text("ENTER to play", CANVAS_WIDTH/2 - 200, CANVAS_HEIGHT/2 + 65);
    text("RIGHT SHIFT to pause", CANVAS_WIDTH/2 - 200, CANVAS_HEIGHT/2 + 85);
    text("/ to unpause", CANVAS_WIDTH/2 - 200, CANVAS_HEIGHT/2 + 105);
    text("BACKSPACE to restart", CANVAS_WIDTH/2 - 200, CANVAS_HEIGHT/2 + 125);
  }
