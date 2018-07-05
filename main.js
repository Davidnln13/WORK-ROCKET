var gameNamespace = {};

function main()
{
  //sets up a new "game"
  const g = new Game();
  gameNamespace.game = g;
  g.initWorld();

}
