var particles = [];
var max = 60;

class FireParticle
{
  //The class we will use to store particles. It includes x and y
  //coordinates, horizontal and vertical speed, and how long it's
  //been "alive" for.
  FireParticle(x, y, xs, ys, ctx)
  {
    this.speed=3;
    this.size=20;
    this.x=x;
    this.y=y;
    this.xs=xs;
    this.ys=ys;
    this.life=0;
    this.ctx = ctx;
  }

  init() {
      //Makes the colors add onto each other, producing
      //that nice white in the middle of the fire
      this.ctx.globalCompositeOperation="xor";
    }

  update() {

    //Adds ten new particles every frame
    // for (var i=0; i<10; i++) {
    //
    //   //Adds a particle at the mouse position, with random horizontal and vertical speeds
    //   var p = new FireParticle(50,50,2,2,this.ctx);
    //   particles.push(p);
    // }
    //Cycle through all the particles to draw them
    for (var i=0; i<particles.length; i++) {

      //Set the file colour to an RGBA value where it starts off red-orange, but progressively gets more grey and transparent the longer the particle has been alive for
      this.ctx.fillStyle = "rgba("+(260-(particles[i].life*2))+","+((particles[i].life*2)+50)+","+(particles[i].life*2)+","+(((max-particles[i].life)/max)*0.4)+")";

      this.ctx.beginPath();
      //Draw the particle as a circle, which gets slightly smaller the longer it's been alive for
      this.ctx.arc(particles[i].x,particles[i].y,(max-particles[i].life)/max*(size/2)+(size/2),0,2*Math.PI);
      this.ctx.fill();

      //Move the particle based on its horizontal and vertical speeds
      particles[i].x+=particles[i].xs;
      particles[i].y+=particles[i].ys;

      particles[i].life++;
      //If the particle has lived longer than we are allowing, remove it from the array.
      if (particles[i].life >= max) {
        particles.splice(i, 1);
        i--;
      }
    }
}
}
