/**
 * main is the entry point for Javascript programs.
 *
 */
function main()
{
  //initialise
  initCanvas();
  //draw
  draw();
}

function initCanvas()
{
  //creates sets and ids the canvas
	var canvas = document.createElement("canvas");
	canvas.id = 'canvas';
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.body.appendChild(canvas);


}

function draw(array,index)
{
  var c =document.getElementById("canvas");
  var context =c.getContext("2d");
  var img=document.getElementById("spaceship");
  ctx.drawImage(img,10,10,150,180);
}
