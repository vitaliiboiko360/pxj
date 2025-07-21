import {
  Application,
  Assets,
  Sprite,
  MeshGeometry,
  Shader,
  Mesh,
  MeshSimple,
  PerspectiveMesh,
  Point,
  Ticker,
} from 'pixi.js';

function makePoint(x, y): Point {
  if (x == undefined || y == undefined) {
    return new Point(0, 0);
  }
  return new Point(x, y);
}

const center_x = window.innerWidth / 2;
const center_y = window.innerHeight / 2;

export const playGround = async () => {
  const app = new Application();

  await app.init({ background: '#1099bb', resizeTo: window });

  document.getElementById('pixi-container')!.appendChild(app.canvas);

  const texture = await Assets.load('/assets/bunny.png');
  const textureCard = await Assets.load('/assets/uno_card.svg');
  const textureEmptyCard = await Assets.load('/assets/uno_empty_bottom.svg');

  const bunny = new Sprite(texture);
  const unoCard = new Sprite(textureCard);

  bunny.anchor.set(0.5);
  unoCard.anchor.set(0.5);

  bunny.position.set(app.screen.width / 2, app.screen.height / 2);
  unoCard.position.set(app.screen.width / 2, app.screen.height / 2);

  app.stage.addChildAt(bunny, 0);
  app.stage.addChildAt(unoCard, 1);

  const geometry = new MeshGeometry({
    positions: new Float32Array([0, 0, 100, 0, 100, 100, 0, 100]),
    uvs: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
    indices: new Uint32Array([0, 1, 2, 0, 2, 3]),
  });

  const shader = Shader.from({
    gl: {
      vertex: `
              attribute vec2 aPosition;
              attribute vec2 aUV;
              varying vec2 vUV;
              void main() {
                  gl_Position = vec4(aPosition / 100.0 - 1.0, 0.0, 1.0);
                  vUV = aUV;
              }
          `,
      fragment: `
              precision mediump float;
              varying vec2 vUV;
              uniform sampler2D uSampler;
              void main() {
                  gl_FragColor = texture2D(uSampler, vUV);
              }
          `,
    },
    resources: {
      uSampler: textureCard.source,
    },
  });

  const mesh = new Mesh({ geometry, shader });

  const mesh2 = new MeshSimple({
    texture: textureCard,
    vertices: new Float32Array([0, 0, 100, 0, 100, 100, 0, 100]),
    uvs: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
    indices: new Uint32Array([0, 1, 2, 0, 2, 3]),
  });
  // app.stage.addChild(mesh2);
  // app.stage.addChildAt(mesh, 2);

  // add controls
  const p1 = makePoint(200, 180);
  const p2 = makePoint(380, 210);
  const p3 = makePoint(280, 370);
  const p4 = makePoint(80, 330);
  unoCard.scale.set(0.5);
  const mesh3 = new PerspectiveMesh({
    texture: unoCard.texture,
    verticesX: 20,
    verticesY: 20,
    x0: p1.x,
    y0: p1.y,
    x1: p2.x,
    y1: p2.y,
    x2: p3.x,
    y2: p3.y,
    x3: p4.x,
    y3: p4.y,
  });
  const mesh4 = new PerspectiveMesh({
    texture: textureEmptyCard,
    verticesX: 20,
    verticesY: 20,
    x0: p1.x,
    y0: p1.y,
    x1: p2.x,
    y1: p2.y,
    x2: p3.x,
    y2: p3.y,
    x3: p4.x,
    y3: p4.y,
  });
  const mesh5 = new PerspectiveMesh({
    texture: textureEmptyCard,
    verticesX: 20,
    verticesY: 20,
    x0: p1.x,
    y0: p1.y,
    x1: p2.x,
    y1: p2.y,
    x2: p3.x,
    y2: p3.y,
    x3: p4.x,
    y3: p4.y,
  });
  const mesh6 = new PerspectiveMesh({
    texture: textureEmptyCard,
    verticesX: 20,
    verticesY: 20,
    x0: p1.x,
    y0: p1.y,
    x1: p2.x,
    y1: p2.y,
    x2: p3.x,
    y2: p3.y,
    x3: p4.x,
    y3: p4.y,
  });
  const mesh7 = new PerspectiveMesh({
    texture: textureEmptyCard,
    verticesX: 20,
    verticesY: 20,
    x0: p1.x,
    y0: p1.y,
    x1: p2.x,
    y1: p2.y,
    x2: p3.x,
    y2: p3.y,
    x3: p4.x,
    y3: p4.y,
  });
  const mesh8 = new PerspectiveMesh({
    texture: textureEmptyCard,
    verticesX: 20,
    verticesY: 20,
    x0: p1.x,
    y0: p1.y,
    x1: p2.x,
    y1: p2.y,
    x2: p3.x,
    y2: p3.y,
    x3: p4.x,
    y3: p4.y,
  });
  const mesh9 = new PerspectiveMesh({
    texture: textureEmptyCard,
    verticesX: 20,
    verticesY: 20,
    x0: p1.x,
    y0: p1.y,
    x1: p2.x,
    y1: p2.y,
    x2: p3.x,
    y2: p3.y,
    x3: p4.x,
    y3: p4.y,
  });
  console.log(mesh3.localTransform.toString());
  console.log(mesh3.worldTransform.toString());
  mesh3.updateTransform({
    x: 400,
    y: 400,
    scaleX: 0.5,
    scaleY: 0.5,
  });
  mesh4.updateTransform({
    x: 401,
    y: 404,
    scaleX: 0.5,
    scaleY: 0.5,
  });
  mesh5.updateTransform({
    x: 401,
    y: 408,
    scaleX: 0.5,
    scaleY: 0.5,
  });
  mesh6.updateTransform({
    x: 401,
    y: 412,
    scaleX: 0.5,
    scaleY: 0.5,
  });
  mesh7.updateTransform({
    x: 401,
    y: 416,
    scaleX: 0.5,
    scaleY: 0.5,
  });
  mesh8.updateTransform({
    x: 401,
    y: 420,
    scaleX: 0.5,
    scaleY: 0.5,
  });
  mesh9.updateTransform({
    x: 401,
    y: 424,
    scaleX: 0.5,
    scaleY: 0.5,
  });
  console.log(mesh3.worldTransform.toString());

  const updateMesh = () =>
    mesh3.setCorners(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
  const divElement = document.getElementById('controls');
  divElement.querySelectorAll('md-outlined-text-field').forEach((el) => {
    if (el.label == 'P1.x') {
      el.setAttribute('value', p1.x);
      el.addEventListener('input', (event) => {
        console.log(event.target.value);
        p1.x = event.target.value;
        updateMesh();
      });
    }
    if (el.label == 'P1.y') {
      el.setAttribute('value', p1.y);
      el.addEventListener('input', (event) => {
        console.log(event.target.value);
        p1.y = event.target.value;
        updateMesh();
      });
    }
    if (el.label == 'P2.x') {
      el.setAttribute('value', p2.x);
      el.addEventListener('input', (event) => {
        console.log(event.target.value);
        p2.x = event.target.value;
        updateMesh();
      });
    }
    if (el.label == 'P2.y') {
      el.setAttribute('value', p2.y);
      el.addEventListener('input', (event) => {
        console.log(event.target.value);
        p2.y = event.target.value;
        updateMesh();
      });
    }
    if (el.label == 'P3.x') {
      el.setAttribute('value', p3.x);
      el.addEventListener('input', (event) => {
        console.log(event.target.value);
        p3.x = event.target.value;
        updateMesh();
      });
    }
    if (el.label == 'P3.y') {
      el.setAttribute('value', p3.y);
      el.addEventListener('input', (event) => {
        console.log(event.target.value);
        p3.y = event.target.value;
        updateMesh();
      });
    }
    if (el.label == 'P4.x') {
      el.setAttribute('value', p4.x);
      el.addEventListener('input', (event) => {
        console.log(event.target.value);
        p4.x = event.target.value;
        updateMesh();
      });
    }
    if (el.label == 'P4.y') {
      el.setAttribute('value', p4.y);
      el.addEventListener('input', (event) => {
        console.log(event.target.value);
        p4.y = event.target.value;
        updateMesh();
      });
    }
  });

  app.stage.addChild(mesh9);
  app.stage.addChild(mesh8);
  app.stage.addChild(mesh7);
  app.stage.addChild(mesh6);
  app.stage.addChild(mesh5);
  app.stage.addChild(mesh4);
  app.stage.addChild(mesh3);

  // app.ticker.add((time) => {
  //   bunny.rotation += 0.1 * time.deltaTime;
  // });

  app.stage.addChild(unoCard);
  const startPoint = new Point(center_x - 480, center_y - 90);
  let ticker;
  let endPoint = new Point(bunny.position._x, bunny.position._y);
  function hanleStart() {
    const deltaX = Math.abs(endPoint.x - startPoint.x);
    const deltaY = Math.abs(endPoint.y - startPoint.y);
    unoCard.position.set(startPoint.x, startPoint.y);

    unoCard.rotation = 0;
    let deltaElapsed;
    // if (ticker) {
    //   ticker.start();
    //   return;
    // }
    ticker = new Ticker();
    ticker.add((ticker) => {
      const currentPoint = unoCard.position;
      if (
        Math.abs(currentPoint.x - startPoint.x) > deltaX ||
        Math.abs(currentPoint.y - startPoint.y) > deltaY
      ) {
        ticker.stop();
        unoCard.rotation = 0;
        return;
      }
      if ((deltaElapsed += ticker.deltaTime) < 0.8) {
        return;
      }
      deltaElapsed = 0;
      unoCard.position.set(
        startPoint.x > endPoint.x
          ? currentPoint.x - deltaX / 50
          : currentPoint.x + deltaX / 50,
        startPoint.y > endPoint.y
          ? currentPoint.y - deltaY / 50
          : currentPoint.y + deltaY / 50
      );
      unoCard.rotation += (Math.PI * 2) / 50;
    });
    ticker.start();
  }

  const startButton = document.getElementById('startButton');
  startButton?.addEventListener('click', (event) => {
    hanleStart();
  });

  app.stage.addChild(bunny);
  let dragTarget = null;

  app.stage.eventMode = 'static';
  app.stage.hitArea = app.screen;
  app.stage.on('pointerup', onDragEnd);
  app.stage.on('pointerupoutside', onDragEnd);

  function onDragMove(event) {
    if (dragTarget) {
      dragTarget.parent.toLocal(event.global, null, dragTarget.position);
    }
  }

  function onDragStart() {
    // Store a reference to the data
    // * The reason for this is because of multitouch *
    // * We want to track the movement of this particular touch *
    this.alpha = 0.5;
    dragTarget = this;
    app.stage.on('pointermove', onDragMove);
  }

  function onDragEnd() {
    if (dragTarget) {
      app.stage.off('pointermove', onDragMove);
      dragTarget.alpha = 1;
      dragTarget = null;
      endPoint = new Point(bunny.position.x, bunny.position.y);
      console.log(`x == ${endPoint.x}  y == ${endPoint.y}`);
    }
  }

  bunny.eventMode = 'static';
  bunny.cursor = 'pointer';
  bunny.on('pointerdown', onDragStart, bunny);
};
