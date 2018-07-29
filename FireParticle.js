class FireParticle
{
  constructor(xIn, yIn, speedXIn, speedYIn, colourIn, sizeIn, lifeExpectIn, maxIn)
  {
    this.x=xIn;
    this.y=yIn;
    this.speedX=speedXIn;
    this.speedY=speedYIn;
    this.colour = colourIn;
    this.size = sizeIn;
    //bigger the number the shorter they live
    this.lifeExpect = lifeExpectIn;
    this.max = maxIn;
  }
  update(context,pArr)
  {
    for(var i = 0; i<pArr.length; i++)
    {
      //Set the file colour to an RGBA value where it starts off red-orange, but progressively
      //gets more grey and transparent the longer the particle has been alive for
      context.fillStyle = "rgba("+(pArr[i].colour.R-(pArr[i].lifeExpect*2))+","+((pArr[i].lifeExpect*2)+pArr[i].colour.G)+","
                                 +((pArr[i].lifeExpect*2)+pArr[i].colour.B)+","
                 /*alpha*/       +(((pArr[i].max-pArr[i].lifeExpect)/pArr[i].max)*0.4)+")";

      context.beginPath();
      //Draw the particle as a circle, which gets slightly smaller the longer it's been alive for
      context.arc(pArr[i].x,pArr[i].y,(pArr[i].max-pArr[i].lifeExpect)/pArr[i].max*(pArr[i].size/2)+(pArr[i].size/2),0,2*Math.PI);
      context.fill();

      //Move the particle based on its horizontal and vertical speeds
      pArr[i].x+=pArr[i].speedX;
      pArr[i].y-=pArr[i].speedY;

      pArr[i].lifeExpect++;
      //If the particle has lived longer than we are allowing, remove it from the array.
      if (pArr[i].lifeExpect >= pArr[i].max)
      {
          pArr.splice(i, 1);
          i--;
      }
    }
  }
}
