import { Application, Assets, Sprite, Graphics, Ticker } from 'pixi.js';

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

  unocard.scale.set(0.5, 0.5);

  const sq = new Graphics().rect(0, 0, 10, 10).fill('red');

  sq.position.set(app.screen.width / 4, app.screen.height / 4);

  // Move the sprite to the center of the screen
  bunny.position.set(app.screen.width / 2, app.screen.height / 2);
  unocard.position.set(app.screen.width / 4, app.screen.height / 4);

  const center_x = app.screen.width / 2;
  const center_y = app.screen.height / 2;

  // Add the bunny to the stage
  app.stage.addChildAt(bunny, 0);
  app.stage.addChildAt(unocard, 1);
  app.stage.addChildAt(sq, 2);

  let isStarted: Ticker;
  // build button unrelated to Pixi
  {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.style.position = 'absolute';
    button.textContent = 'start move';
    const appElement = document.getElementById('app');
    appElement?.appendChild(button);

    button.addEventListener('click', () => {
      if (isStarted != undefined) {
        if (!isStarted.started) {
          isStarted.start();
          return;
        }

        isStarted.stop();
        return;
      }
      const radius = 200;
      let angle = 0;
      isStarted = app.ticker.add((time) => {
        // Just for fun, let's rotate mr rabbit a little.
        // * Delta is 1 if running at 100% performance *
        // * Creates frame-independent transformation *

        bunny.rotation += 0.1 * time.deltaTime;

        unocard.rotation += 0.025 * time.deltaTime;

        angle = (angle + 0.01) % (Math.PI * 2);

        unocard.position.set(
          center_x + Math.cos(angle) * radius,
          center_y + Math.sin(angle) * radius
        );

        const p = unocard.position;
        sq.position.set(p._x - 5, p._y - 5);
      });
    });
  }

  // Listen for animate update
  // app.ticker.add((time) => {
  //   // Just for fun, let's rotate mr rabbit a little.
  //   // * Delta is 1 if running at 100% performance *
  //   // * Creates frame-independent transformation *
  //   const p0 = unocard.position;
  //   if (p0._x > app.screen.width / 2 && p0._y > app.screen.height / 2) {
  //     unocard.position.set(app.screen.width / 4, app.screen.height / 4);
  //   }
  //   bunny.rotation += 0.1 * time.deltaTime;
  //   unocard.rotation += 0.025 * time.deltaTime;
  //   unocard.position.set(p0._x + 1, p0._y + 1);
  //   const p = unocard.position;
  //   sq.position.set(p._x - 5, p._y - 5);
  // });
})();
