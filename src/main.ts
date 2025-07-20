'use strict';
import { Application, Assets, Sprite, Graphics, Ticker, Color } from 'pixi.js';

declare global {
  interface Window {
    pixi: PixiAnimator;
  }
}

class PixiAnimator {
  bunny;
  unocard;
  sq;
  isInitialized = false;
  app;
  isStarted;

  async init() {
    if (this.isInitialized) {
      console.log('already initialized');
      return;
    }

    this.app = new Application();

    // Initialize the application
    await this.app.init({
      backgroundAlpha: 0,
      background: new Color({ r: 255, g: 0, b: 0, a: 0 }),
      resizeTo: window,
    });

    // Append the application canvas to the document body
    document.getElementById('pixi-container')!.appendChild(this.app.canvas);
    console.log(this.app);
    const texture = await Assets.load('/assets/bunny.png');
    const texture2 = await Assets.load('/assets/uno_card.svg');
    this.bunny = new Sprite(texture);
    this.unocard = new Sprite(texture2);

    this.bunny.anchor.set(0.5);
    this.unocard.anchor.set(0.5);

    this.unocard.scale.set(0.5, 0.5);

    this.sq = new Graphics().rect(0, 0, 10, 10).fill('red');

    this.sq.position.set(this.app.screen.width / 4, this.app.screen.height / 4);

    this.bunny.position.set(
      this.app.screen.width / 2,
      this.app.screen.height / 2
    );
    this.unocard.position.set(
      this.app.screen.width / 4,
      this.app.screen.height / 4
    );

    this.app.stage.addChildAt(this.bunny, 0);
    this.app.stage.addChildAt(this.unocard, 1);
    this.app.stage.addChildAt(this.sq, 2);

    this.isInitialized = true;
  }

  startStopMoving() {
    if (this.isStarted != undefined) {
      if (!this.isStarted.started) {
        this.isStarted.start();
        return;
      }

      this.isStarted.stop();
      return;
    }
    const radius = 200;
    let angle = 0;
    this.isStarted = this.app.ticker.add((time) => {
      this.bunny.rotation += 0.1 * time.deltaTime;

      this.unocard.rotation += 0.025 * time.deltaTime;

      angle = (angle + 0.01) % (Math.PI * 2);

      this.unocard.position.set(
        center_x + Math.cos(angle) * radius,
        center_y + Math.sin(angle) * radius
      );

      const p = this.unocard.position;
      this.sq.position.set(p._x - 5, p._y - 5);
    });
  }

  centerCat() {
    this.bunny.position.set(center_x, center_y);
  }
}

let center_x = window.innerWidth / 2;
let center_y = window.innerHeight / 2;

window.addEventListener('resize', () => {
  center_x =
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 2;
  center_y =
    Math.max(document.documentElement.clientHeight, window.innerHeight || 0) /
    2;

  if (window.pixi.isInitialized) {
    window.pixi.app.resize();
    window.pixi.centerCat();
  }
});

window.pixi = new PixiAnimator();

import { playGround } from './playGround';

playGround();
