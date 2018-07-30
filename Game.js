var particles = [];

class Game
{
  /**
  * initWorld
  * @desc Initialises game world
  */
  initWorld()
  {
    //context
    this.ctx;
    //initialise canvas
    gameNamespace.game.initCanvas();
    console.log("Initialising Game World");
    this.rocketImg = new Image();
    this.rocketImg.src = "resources/images/spaceship.png";
    this.rocketImg.addEventListener("load", this.loadImage);
    this.rocketSprite = new Rocket(this.ctx,{width: 100, height: 175, image: this.rocketImg});
    //used to destroy the spawners
    gameNamespace.destroyParticleSpawners = false;
    //number of errors decides the number of explosions
    this.numberOfErrors = 3;
    //rocket speed needed for when the rocket is centered to make it look like its still moving
    gameNamespace.rocketSpeed = 0;
    //timers needed to start the rocket moving again
    gameNamespace.timeToWait = 10;
    gameNamespace.startingTime;
    gameNamespace.currentTime;
    //bool to wait once
    this.waited = false;
    //explosions
    this.explodeOne = false;
    this.explodeTwo = false;
    this.exploseThree = false;
  }
  //when the image loads we call update
  loadImage(e)
  {
    gameNamespace.game.update();
  }
  initCanvas()
  {
    //creates sets and ids the canvas
  	var canvas = document.createElement("canvas");
  	canvas.id = 'canvas';
  	canvas.width = window.innerWidth;
  	canvas.height = window.innerHeight;
  	document.body.appendChild(canvas);
    this.ctx = canvas.getContext("2d");
    this.ctx.globalCompositeOperation="lighter";
  }

  update()
  {
    if(gameNamespace.destroyParticleSpawners === false)
    {
      gameNamespace.game.waitInMiddle();
    }
    gameNamespace.game.rocketSprite.update();
    gameNamespace.game.draw();
    gameNamespace.game.updateParticles();

   //recursively calls update of game : this method
   window.requestAnimationFrame(gameNamespace.game.update);
  }
  waitInMiddle()
  {
    //if rocket is higher than halfway and waited is false
    if(gameNamespace.game.rocketSprite.imgY < window.innerHeight/ 2 && this.waited === false)
    {
      //make waited true
      this.waited = true;
      //take rocket speed to make it seem like no change
      gameNamespace.rocketSpeed = gameNamespace.game.rocketSprite.currentVelocityY;
      //let the rocket know its waiting
      gameNamespace.game.rocketSprite.waitHalfway = false;
      //start the timer
      gameNamespace.startingTime = new Date();
    }
    if(this.waited === true)
    {
      gameNamespace.game.rocketSprite.moveSidewards(50,200);
      //update timer every time we enter here
      gameNamespace.currentTime = new Date();
      //when the difference is more than the countdown take off
      var differenceInSeconds = (gameNamespace.currentTime.getTime() - gameNamespace.startingTime.getTime())/1000;
      //spawn the explosions as we get closer to moving off
      if(gameNamespace.timeToWait / differenceInSeconds < 4)
      {
        this.explodeOne = true;
        if(gameNamespace.timeToWait / differenceInSeconds < 3)
        {
          this.explodeTwo = true;
          if(gameNamespace.timeToWait / differenceInSeconds < 2)
          {
            this.explodeThree = true;
          }
        }

      }
      if(differenceInSeconds >= gameNamespace.timeToWait && gameNamespace.game.rocketSprite.centered === true)
      {
        if(this.numberOfErrors < 3)
        {
          gameNamespace.game.rocketSprite.waitHalfway = true;
          gameNamespace.rocketSpeed = 0;
          console.log("It was rough, but we made it");
        }
        else
        {
          console.log("Houston, we have a problem");
          gameNamespace.destroyParticleSpawners = true;
          gameNamespace.game.rocketSprite.rocketDestroyed = true;
          gameNamespace.game.rocketSprite.currentVelocityY = 0;
        }
      }
    }
  }
  updateParticles()
  {
    //destroys all spawners
    if(gameNamespace.game.rocketSprite.imgY <0 - gameNamespace.game.rocketSprite.height)
    {
      gameNamespace.destroyParticleSpawners = true;
    }
    //constructor(xIn, yIn, speedXIn, speedYIn, colourIn, sizeIn, lifeExpectIn, maxIn)
    if(gameNamespace.destroyParticleSpawners === false)
    {
      //rocket flame particle
         gameNamespace.game.createNewParticleSpawner(10,gameNamespace.game.rocketSprite.imgX+50, gameNamespace.game.rocketSprite.imgY+155,
                                3,3,gameNamespace.rocketSpeed,{R:260, G:50, B:0},15,-50,60);
         //explosion 1
         if(this.numberOfErrors > 0 && this.explodeOne === true )
         {
           gameNamespace.game.createNewParticleSpawner(10,gameNamespace.game.rocketSprite.imgX+20,gameNamespace.game.rocketSprite.imgY+50,
                                  3,3,0,{R:260, G:50, B:0},3,-10,60);
         }
         //explosion 2
         if(this.numberOfErrors > 1 && this.explodeTwo === true)
         {
           gameNamespace.game.createNewParticleSpawner(10,gameNamespace.game.rocketSprite.imgX+85,gameNamespace.game.rocketSprite.imgY+85,
                                  3,3,0,{R:260, G:50, B:0},3,-10,60);
         }
         //explosion 3
         if(this.numberOfErrors > 2 && this.explodeThree == true)
         {
           gameNamespace.game.createNewParticleSpawner(10,gameNamespace.game.rocketSprite.imgX+65,gameNamespace.game.rocketSprite.imgY+13,
                                  3,3,0,{R:260, G:50, B:0},3,-10,60)
         }
    }
    if(gameNamespace.game.rocketSprite.secondsPassed >= gameNamespace.game.rocketSprite.countdownSeconds && particles.length > 0)
    {
      //Cycle through all the particles to draw them
      particles[0].update(this.ctx,particles);
    }

  }
  createNewParticleSpawner(quantity,posX,posY,speedX,speedY,rocketSpeed,colour,size,life,max)
  {
    for (var i=0; i<quantity; i++)
    {
        if(gameNamespace.game.rocketSprite.secondsPassed >= gameNamespace.game.rocketSprite.countdownSeconds)
        {
          var p = new FireParticle(posX,posY,(Math.random()*2*speedX-speedX)/2,(0-Math.random()*2*speedY)-rocketSpeed,{R:colour.R, G:colour.G, B:colour.B},size,life,max);
          particles.push(p);
        }
    }
  }
  draw()
  {
    //clear window redraw image
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.rocketSprite.render();
  }
}
