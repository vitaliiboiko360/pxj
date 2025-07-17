import { Application, Assets, Sprite } from 'pixi.js';

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: '#1099bb', resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById('pixi-container')!.appendChild(app.canvas);

  // Load the bunny texture
  const texture = await Assets.load('/assets/bunny.png');
  const texture2 = await Assets.load('/assets/uno_card.svg');

  // Create a bunny Sprite
  const bunny = new Sprite(texture);
  const unocard = new Sprite(texture2);

  // Center the sprite's anchor point
  bunny.anchor.set(0.5);
  unocard.anchor.set(0.5);

  // Move the sprite to the center of the screen
  bunny.position.set(app.screen.width / 2, app.screen.height / 2);
  unocard.position.set(app.screen.width / 4, app.screen.height / 4);

  // Add the bunny to the stage
  app.stage.addChild(bunny);
  app.stage.addChild(unocard);

  // Listen for animate update
  app.ticker.add((time) => {
    // Just for fun, let's rotate mr rabbit a little.
    // * Delta is 1 if running at 100% performance *
    // * Creates frame-independent transformation *
    const p = unocard.position;
    if (p._x > app.screen.width / 2 && p._y > app.screen.height / 2) {
      unocard.position.set(app.screen.width / 4, app.screen.height / 4);
    }
    bunny.rotation += 0.1 * time.deltaTime;
    unocard.rotation += 0.025 * time.deltaTime;
    unocard.position.set(p._x + 1, p._y + 1);
  });
})();
