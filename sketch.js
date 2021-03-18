
var bg, backgroundImg,platformImage,platformGroup;
var diamondImage,diamondsGroup;
var score =0;

function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironImage = loadImage("images/iron.png");
  platformImage = loadImage("images/stone.png");
  diamondImage = loadImage("images/diamond.png");
  }

function setup() {
  createCanvas(1000, 600);
  bg = createSprite(580,300);
  bg.addImage(backgroundImg);
  bg.scale =2;
 
  ironMan = createSprite(200, 505, 20, 50);
  ironMan.addImage("running", ironImage);
  ironMan.scale = 0.3;
  ironMan.debug=true;
  ironMan.setCollider("rectangle",100,0,200,400)
  platformGroup = new Group();
  diamondsGroup = new Group();
}

function draw() {

  
  if (keyDown("up")) {
    ironMan.velocityY = -10;
  }
  if (keyDown("left")) {
    ironMan.x = ironMan.x - 5;
  }
  if (keyDown("right")) {
    ironMan.x = ironMan.x + 5;
  }
  ironMan.velocityY = ironMan.velocityY + 0.5;

  generatePlatforms();
  for (var i = 0; i < platformGroup.length; i++) {
    var temp = platformGroup.get(i);

    if (temp.isTouching(ironMan)) {
      ironMan.collide(temp);
    }
  }

  generateDiamonds();

  for(var i = 0 ; i< (diamondsGroup).length ;i++){
    var temp = (diamondsGroup).get(i) ;
    
    if (temp.isTouching(ironMan)) {
      score++;
      temp.destroy();
      temp=null;
      }
        
    }
    drawSprites();
    textSize(20);
    fill("white")
    text("Diamonds Collected: "+ score, 500,50);
   
}
function generatePlatforms() {
  if (frameCount % 60 === 0) {
    var brick = createSprite(1200, 10, 40, 10);
    brick.x = random(50, 850);
    brick.addImage(platformImage);
    brick.velocityY = 5;
    brick.lifetime = 250;
    platformGroup.add(brick);
  }
}


function generateDiamonds() {
  if (frameCount % 80 === 0) {
    var diamond = createSprite(1200, 0, 40, 10);

    diamond.addAnimation("diamond", diamondImage);
    diamond.x = random(50, 850);
    diamond.scale = 0.5;
    diamond.velocityY = 3;
    diamond.lifetime = 1200;
    diamondsGroup.add(diamond);
  }
}