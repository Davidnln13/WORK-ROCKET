var particles = [];
var speed=3;
var size=20;
var max = 60;
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

    gameNamespace.game.updateFlame();
    gameNamespace.game.rocketSprite.update();
    gameNamespace.game.draw();

   //recursively calls update of game : this method
   window.requestAnimationFrame(gameNamespace.game.update);
  }

  updateFlame()
  {

    //Adds ten new particles every frame
    for (var i=0; i<10; i++)
    {

        //Adds a particle at the mouse position, with random horizontal and vertical speeds
        if(gameNamespace.game.rocketSprite.secondsPassed >=5 )
        {
          var p = new FireParticle(gameNamespace.game.rocketSprite.imgX+50, gameNamespace.game.rocketSprite.imgY+155, (Math.random()*2*speed-speed)/2, 0-Math.random()*2*speed);
          particles.push(p);
        }
    }

    //Clear the this.ctx so we can draw the new frame
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    //Cycle through all the particles to draw them
    for (var i=0; i<particles.length; i++)
    {

        //Set the file colour to an RGBA value where it starts off red-orange, but progressively
        //gets more grey and transparent the longer the particle has been alive for
        this.ctx.fillStyle = "rgba("+(260-(particles[i].life*2))+","+((particles[i].life*2)+50)+","+(particles[i].life*2)+","+(((max-particles[i].life)/max)*0.4)+")";

        this.ctx.beginPath();
        //Draw the particle as a circle, which gets slightly smaller the longer it's been alive for
        this.ctx.arc(particles[i].x,particles[i].y,(max-particles[i].life)/max*(size/2)+(size/2),0,2*Math.PI);
        this.ctx.fill();

        //Move the particle based on its horizontal and vertical speeds
        particles[i].x+=particles[i].xs;
        particles[i].y-=particles[i].ys;

        particles[i].life++;
        //If the particle has lived longer than we are allowing, remove it from the array.
        if (particles[i].life >= max)
        {
            particles.splice(i, 1);
            i--;
        }
    }
  }
  draw()
  {
    //clear window redraw image
    //this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.rocketSprite.render();
  }
}
