class Sprite
{
  constructor(context, imageOptions)
  {
     this.width = imageOptions.width;
     this.height = imageOptions.height;
     this.image = imageOptions.image;
     this.imgX = window.innerWidth/2 - (imageOptions.width/2);
     this.imgY = window.innerHeight - imageOptions.height;
     this.ctx = context;
     this.countdown = true;
     this.startTime = new Date();
     this.currentTime = new Date();
     this.currentVelocityY = 0.1;
  }

  update()
  {
    if(this.countdown === true)
    {
      this.currentTime = new Date();
      console.log(this.currentTime - this.startTime);
      if(this.currentTime - this.startTime > 5000)
      {
        this.countdown = false;
      }
    }
    if(this.countdown === false)
    {
      this.imgY -= this.currentVelocityY;
    }

  }
  render()
  {
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      this.ctx.drawImage(this.image,this.imgX,this.imgY,this.width,this.height);
  }
}
