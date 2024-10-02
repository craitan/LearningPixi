import {
  Application,
  Graphics,
  Text,
  TextStyle,
  Assets,
  Sprite,
} from "pixi.js";

(async () => {
  const app = new Application(); // This is initializing the app

  await app.init({
    background: "#1099bb", // This is for the color of the background
    resizeTo: window, // This is for the size of the canvas
    backgroundAlpha: 1, // This is for how dark the color is
  });

  app.canvas.style.position = "absolute"; // This is for the position of the canvas

  //   // Here we create a form of a rectangle
  //   const rectangle = new Graphics() // This is initializing the rectangle
  //     .rect(200, 200, 100, 100) // This is for the size and the form of the rectangle
  //     .fill({
  //       color: 0x000000, //This is for the color of the rectangle
  //       backgroundAlpha: 1.5, // This is for how dark the color is
  //     });

  // Here we create a form of a text we can add styles colors and etc
  const text = new Text({
    text: "Itsumi Mario",
  });

  //We add img of super Mario here
  const texture = await Assets.load("/imgs/pngwing.com.png");

  const superMario = Sprite.from(texture);
  Object.assign(superMario, {
    width: 60,
    height: 60,
    x: 100,
    y: app.canvas.height - 60, // Here we put Mario at the bottom of the canvas - 60 is his height
  });

  //   app.stage.addChild(rectangle);
  app.stage.addChild(text);
  app.stage.addChild(superMario);

  let moveLeft = false;
  let moveRight = false;
  let jump = false;
  let isJumping = false;

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      moveLeft = true;
    } else if (e.key === "ArrowRight") {
      moveRight = true;
    }
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") {
      moveLeft = false;
    } else if (e.key === "ArrowRight") {
      moveRight = false;
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === " ") {
      jump = true;
    }
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === " ") {
      jump = false;
    }
  });

  app.ticker.add(() => {
    if (moveLeft && superMario.x > 0) {
      superMario.x -= 5;
    } else if (
      moveRight &&
      superMario.x < app.canvas.width - superMario.width
    ) {
      superMario.x += 5;
    }

    if (jump) {
      superMario.y -= 20;
    } else if (!jump && superMario.y < app.canvas.height - superMario.height) {
      superMario.y += 20;
    }
  });

  document.body.appendChild(app.canvas);
})();
