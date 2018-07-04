var gameNamespace = {};

function main()
{
  const g = new Game();
  gameNamespace.game = g;
  g.initWorld();

}
