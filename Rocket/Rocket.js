class Rocket
{
  constructor(context, imageOptions)
  {
    //size of the image which is actually 286x500 pixels however ive set it to load it into 100x175 to look better
     this.width = imageOptions.width;
     this.height = imageOptions.height;
     this.image = imageOptions.image;
     //place the image in the middle of the bottom of the screen
     this.imgX = window.innerWidth/2 - (imageOptions.width/2);
     this.imgY = window.innerHeight - imageOptions.height;
     this.ctx = context;
     //when the countdown is false were not counting so launch the rocket
     this.countdown = true;
     this.countdownSeconds = 5;
     //check if 5 seconds has passed with the difference
     this.startTime = new Date();
     this.currentTime = new Date();
     this.secondsPassed = 0;
     //the speed i want the rocket to start at
     this.currentVelocityY = 0.001;
     //the velocity i want to end at
     this.finalVelocityY = 15;
     //the change i want everytime we update
     this.changeInVelocity = 0.001;
     this.waitHalfway = true;
     // if the rocket is destroyed fall off
     this.rocketDestroyed = false;
     //moving the rocket side to side
     this.centered = true;
     this.moveBy;
     this.moveDirection;
     this.moveOut = true;
     this.moveBack = false;
     this.moveSteps = 0;
  }
  update()
  {
    //make sure countdown has finished before launching rocket
    if(this.countdown === true)
    {
      this.countdownTimer();
    }
    if(this.countdown === false)
    {
      this.moveUp();
    }
    //increase change in velocity over time for better visuals
    if(this.currentVelocityY > 0.15)
    {
      this.changeInVelocity = 0.02;
    }
    if(this.currentVelocityY > 1)
    {
      this.changeInVelocity = 0.05;
    }

  }
  moveSidewards(min,max)
  {
    if(this.centered === true)
    {
      this.moveBy = Math.floor(Math.random() * (max - min) + min);
      this.moveDirection = Math.floor(Math.random() * (3 - 1) + 1);
      this.centered = false;
      console.log(this.moveBy,this.moveDirection);
    }
    if(this.moveDirection === 1 && this.centered === false)
    {
      if(this.moveOut === true && this.centered === false)
      {
        this.imgX -= 1;
        this.moveSteps++;
      }
      if(this.moveBack === true && this.centered === false)
      {
        this.imgX += 1;
        this.moveSteps--;
        if(this.moveSteps === 0)
        {
          this.centered = true;
          this.moveOut = true;
          this.moveBack = false;
        }
      }
      if(this.moveSteps >= this.moveBy && this.centered === false)
      {
        this.moveOut = false;
        this.moveBack = true;
      }
    }
    if(this.moveDirection === 2 && this.centered === false)
    {
      if(this.moveOut === true && this.centered === false)
      {
        this.imgX += 1;
        this.moveSteps++;
      }
      if(this.moveBack === true && this.centered === false)
      {
        this.imgX -= 1;
        this.moveSteps--;
        if(this.moveSteps === 0)
        {
          this.centered = true;
          this.moveOut = true;
          this.moveBack = false;
        }
      }
      if(this.moveSteps >= this.moveBy && this.centered === false)
      {
        this.moveOut = false;
        this.moveBack = true;
      }
    }

  }
  moveUp()
  {
    //if we are not waiting halfway move normally
    if(this.waitHalfway === true)
    {
      if(this.currentVelocityY < this.finalVelocityY)
      {
        this.currentVelocityY += this.changeInVelocity;
      }
        this.imgY -= this.currentVelocityY;
    }
    if(this.rocketDestroyed === true)
    {
      this.currentVelocityY += 0.98;
      this.imgY += this.currentVelocityY;
    }
  }
  render()
  {
      this.ctx.drawImage(this.image,this.imgX,this.imgY,this.width,this.height);
  }
  countdownTimer()
  {
      this.currentTime = new Date();
      var differenceInSeconds = (this.currentTime.getTime() - this.startTime.getTime())/1000;

      if(differenceInSeconds >= (this.secondsPassed + 1))
      {
        console.log(this.countdownSeconds - this.secondsPassed);
        this.secondsPassed +=1;
        if(differenceInSeconds > this.countdownSeconds)
        {
          console.log("We have lift off");
          this.countdown = false;
        }
      }
   }

}
