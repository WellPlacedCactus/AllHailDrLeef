
(async () => {

  // ----------------------------------------- util

  const loadImage = path => new Promise(resolve => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.src = path;
  });
  const randint = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  const randsign = () => Math.random() < 0.5 ? -1 : 1;

  // ----------------------------------------- variables

  const leef = await loadImage('./leef.png');
  const canvas = document.querySelector('canvas');
  const c = canvas.getContext('2d');
  const mouse = {};
  const parts = [];

  // ----------------------------------------- functions

  const loadDemo = () => {

    mouse.x = 0;
    mouse.y = 0;
    mouse.down = false;

    for (let i = 0; i < 100; i++) {
      parts.push({
        x: randint(0, canvas.width),
        y: -randint(0, canvas.height) - 200,
        r: Math.random() * Math.PI,
        wh: randint(25, 250),
        vx: 0,
        vy: Math.random() * randint(1, 10),
        w: Math.random() * randsign() * 0.05
      });
    }

    requestAnimationFrame(loop);
  };

  const loop = () => {

    // --------------------------------------- clear

    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);

    // --------------------------------------- handle parts

    c.fillStyle = 'black';

    for (let i = parts.length - 1; i >= 0; --i) {
      
      const p = parts[i];

      // ------------------------------------- tick

      p.x += p.vx;
      p.y += p.vy;
      p.r += p.w;

      if (p.y - p.wh > canvas.height) {
        parts.splice(i, 1);
        parts.push({
          x: randint(0, canvas.width),
          y: -200,
          r: Math.random() * Math.PI,
          wh: randint(25, 250),
          vx: 0,
          vy: Math.random() * randint(1, 10),
          w: Math.random() * randsign() * 0.05
        });
      }

      // ------------------------------------- draw

      c.save();
      c.translate(p.x, p.y);
      c.rotate(p.r);
      c.drawImage(leef, -p.wh / 2, -p.wh / 2, p.wh, p.wh);
      c.restore();
    }

    requestAnimationFrame(loop);
  };

  // ----------------------------------------- events

  addEventListener('load', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    loadDemo();
  });

  addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  });

  addEventListener('mousemove', ({ x, y }) => {
    mouse.x = x;
    mouse.y = y;
  });

  addEventListener('mousedown', () => {
    mouse.down = true;
  });

  addEventListener('mouseup', () => {
    mouse.down = false;
  });

})();