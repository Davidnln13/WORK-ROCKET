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
    this.destroyParticleSpawners = false;
    this.numberOfErrors = 0;
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
    gameNamespace.game.rocketSprite.update();
    gameNamespace.game.draw();
    gameNamespace.game.updateParticles();

   //recursively calls update of game : this method
   window.requestAnimationFrame(gameNamespace.game.update);
  }
  updateParticles()
  {
    //destroys all spawners
    if(gameNamespace.game.rocketSprite.imgY <0 - gameNamespace.game.rocketSprite.height)
    {
      this.destroyParticleSpawners = true;
    }
    //constructor(xIn, yIn, speedXIn, speedYIn, colourIn, sizeIn, lifeExpectIn, maxIn)
    if(this.destroyParticleSpawners === false)
    {
      //rocket flame particle
         gameNamespace.game.createNewParticleSpawner(10,gameNamespace.game.rocketSprite.imgX+50, gameNamespace.game.rocketSprite.imgY+155,
                                3,{R:260, G:50, B:0},15,-50,60);
         //explosion 1
         if(this.numberOfErrors > 0)
         {
           gameNamespace.game.createNewParticleSpawner(10,gameNamespace.game.rocketSprite.imgX+20,gameNamespace.game.rocketSprite.imgY+50,
                                  3,{R:260, G:50, B:0},3,-10,60);
         }
         //explosion 2
         if(this.numberOfErrors > 1)
         {
           gameNamespace.game.createNewParticleSpawner(10,gameNamespace.game.rocketSprite.imgX+85,gameNamespace.game.rocketSprite.imgY+85,
                                  3,{R:260, G:50, B:0},3,-10,60);
         }
         //explosion 3
         if(this.numberOfErrors > 2)
         {
           gameNamespace.game.createNewParticleSpawner(10,gameNamespace.game.rocketSprite.imgX+65,gameNamespace.game.rocketSprite.imgY+13,
                                  3,{R:260, G:50, B:0},3,-10,60)
         }
    }
    if(gameNamespace.game.rocketSprite.secondsPassed >= gameNamespace.game.rocketSprite.countdownSeconds && particles.length > 0)
    {
      //Cycle through all the particles to draw them
      particles[0].update(this.ctx,particles);
    }

  }
  createNewParticleSpawner(quantity,posX,posY,speed,colour,size,life,max)
  {
    for (var i=0; i<quantity; i++)
    {
        if(gameNamespace.game.rocketSprite.secondsPassed >= gameNamespace.game.rocketSprite.countdownSeconds)
        {
          var p = new FireParticle(posX,posY,(Math.random()*2*speed-speed)/2,0-Math.random()*2*speed,{R:colour.R, G:colour.G, B:colour.B},size,life,max);
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
