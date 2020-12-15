//global variables
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var score = 0;

var cloud, cloudsGroup, cloudImage;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle15
var gameoverimage,restartimage,gameover,restart

//constant variables
var PLAY=1;
var END=0;
var gameState=PLAY; // trex is moving

var newImage;
var obstacleGroup,cloudGroup;
var flag=1

//Add sound variables
var checkpointsound,diesound,jumpsound;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
 
  diesound=loadSound("die.mp3")
  checkpointsound=loadSound("checkPoint.mp3");
  jumpsound=loadSound("jump.mp3");
  
  gameoverimage=loadImage("gameOver.png")
  restartimage=loadImage("restart.png")
  
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
 trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  //trex.debug=true
  trex.setCollider("rectangle",0,0,150,trex.height)
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4 - score/100
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudGroup= new Group();
  obstacleGroup = new Group();
  
      gameover=createSprite(300,70);
      gameover.addImage(gameoverimage);
      gameover.scale=0.5;
      restart=createSprite(300,120);
      restart.addImage(restartimage);
      restart.scale=0.5;
      gameover.visible=false
      restart.visible=false
  
}

function draw() {
  background(0);
  //console.log(gameState);
     textSize(15);    
      text("Score :" + score,500,50);
  
  //Adding or Concatenation of strings / text value
  var fname="Ethan "
  var lname="Ramirez"
  //console.log(fname + lname);
  
  if(score%100===0 && score>0)
     {
     checkpointsound.play();
     }
  
  if(gameState===PLAY)
    {
      if(frameCount%5===0)
      {
        score++;
      }
       //Makes the trex jump
  if(keyDown("space") && trex.y>=50) {
    jumpsound.play(); //plays the jump sound;
    trex.velocityY = -15;
  }
      //Gravity to trex
  trex.velocityY = trex.velocityY + 0.8
    
    //Moved the ground infinitely
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
     //spawn the clouds
  spawnClouds();
  spawnObstacles()
  }
    
  else if (gameState===END)
    {
      ground.velocityX=0;
      trex.velocityY=0;
      trex.changeAnimation("collided",trex_collided);
      obstacleGroup.setVelocityEach(0,0);
      obstacleGroup.setLifetimeEach(-1);
      cloudGroup.setVelocityEach(0,0);
      cloudGroup.setLifetimeEach(-1);
      //local variables
           
      gameover.visible=true
  restart.visible=true
    }
    
  //mouse click on a sprite
  if(mousePressedOver(restart))
    {
      gameState = PLAY;
    }

//trex to walk on the ground
  trex.collide(invisibleGround);
  
  if(trex.isTouching(obstacleGroup)) // trex touches any obstacle
    {
      gameState=END;
       //trex.velocityY = -15;
      if(flag==1)
        {
        flag = 0
      diesound.play();
        }
     
    }
 //mouse click on a sprite
  if(mousePressedOver(restart))
    {
      gameState = PLAY
      cloudGroup.destroyEach();
      obstacleGroup.destroyEach();
      gameover.visible = false
      restart.visible = false
      score=0
      ground.velocityX = -4 - score/100
      trex.changeAnimation("running",trex_running);
    }
  
  console.log(gameState);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cloud.lifetime=200;
    
    cloudGroup.add(cloud);
    }
}
function spawnObstacles() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    obstacle = createSprite(600,160,40,10);
    
    rand=Math.round(random(1,6));
    switch(rand)
      {
    case 1:obstacle.addImage(obstacle1);break;
    case 2:obstacle.addImage(obstacle2);break;
    case 3:obstacle.addImage(obstacle3);break;
    case 4:obstacle.addImage(obstacle4);break;
    case 5:obstacle.addImage(obstacle5);break;
    case 6:obstacle.addImage(obstacle6);break;
      }
    
    obstacle.velocityX =( -5 - score/100)*2;
    obstacle.scale=0.5;
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle);
    }
}



