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
} from 'pixi.js';

function makePoint(): Point {
  return new Point(0, 0);
}

function makeControls(p1) {
  const divElement = document.createElement('div');
  divElement.setAttribute('draggable', 'true');

  const inputElement = document.createElement('input');
  inputElement.setAttribute('type', 'number');
  inputElement.setAttribute('id', 'p1_x');
  // inputElement.setAttribute('name', 'x1');
  // inputElement.setAttribute('readonly', 'false');
  inputElement.setAttribute('value', 'value');
  inputElement.style.width = '60px';
  inputElement.addEventListener('input', (e) => {
    inputElement.value = 1;
  });
  divElement.appendChild(inputElement);

  document.getElementById('pixi-container')!.appendChild(divElement);
}

(async () => {
  const app = new Application();

  await app.init({ background: '#1099bb', resizeTo: window });

  document.getElementById('pixi-container')!.appendChild(app.canvas);

  const texture = await Assets.load('/assets/bunny.png');
  const textureCard = await Assets.load('/assets/uno_card.svg');

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
  const p1 = makePoint();
  const p2 = makePoint();
  const p3 = makePoint();
  const p4 = makePoint();

  const mesh3 = new PerspectiveMesh({
    texture: textureCard,
    verticesX: 20,
    verticesY: 20,
    x0: 100,
    y0: 100,
    x1: 400,
    y1: 130,
    x2: 280,
    y2: 450,
    x3: 30,
    y3: 380,
  });
  app.stage.addChild(mesh3);
  app.ticker.add((time) => {
    bunny.rotation += 0.1 * time.deltaTime;
  });
})();
