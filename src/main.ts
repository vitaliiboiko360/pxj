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

function makePoint(x, y): Point {
  if (x == undefined || y == undefined) {
    return new Point(0, 0);
  }
  return new Point(x, y);
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
  const p1 = makePoint(100, 100);
  const p2 = makePoint(400, 130);
  const p3 = makePoint(280, 450);
  const p4 = makePoint(30, 380);
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

  const updateMesh = () =>
    mesh3.setCorners(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
  const divElement = document.getElementById('controls');
  divElement.querySelectorAll('md-outlined-text-field').forEach((el) => {
    console.log(el);

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

  app.stage.addChild(mesh3);
  app.ticker.add((time) => {
    bunny.rotation += 0.1 * time.deltaTime;
  });
})();
