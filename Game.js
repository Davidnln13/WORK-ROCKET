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
    gameNamespace.rocketFlame = new FireParticle(50,50,50,50,this.ctx);
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
  }

  update()
  {
    gameNamespace.rocketFlame.update();
    gameNamespace.game.rocketSprite.update();
    gameNamespace.game.draw();

   //recursively calls update of game : this method
   window.requestAnimationFrame(gameNamespace.game.update);
  }

  draw()
  {
    this.rocketSprite.render();
  }
}
