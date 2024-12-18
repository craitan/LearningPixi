import gsap from "gsap";

import {
  Application,
  Graphics,
  Text,
  TextStyle,
  Assets,
  Sprite,
} from "pixi.js";
import { fromEvent } from "rxjs";
import { filter, map } from 'rxjs/operators';

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
  let currentPicture = "/imgs/mario_right.png";
  const texture = await Assets.load(currentPicture);

  const superMario = Sprite.from(texture);
  Object.assign(superMario, {
    width: 40,
    height: 55,
    x: 100,
    y: app.canvas.height - 55, // Here we put Mario at the bottom of the canvas - 60 is his height
  });

  //   app.stage.addChild(rectangle);
  app.stage.addChild(text);
  app.stage.addChild(superMario);

  let moveLeft = false;
  let moveRight = false;
  let jump = false;
  let isJumping = false;
  let jumpSpeed = 0;
  const gravity = 0.5;
  const jumpPower = -10;

  const click$ = fromEvent(document, "click");

  click$.subscribe((event) => {
    console.log(`X: ${event.clientX}, Y: ${event.clientY}`);
  });

  const keydown$ = fromEvent(document, "keydown");
  const keyup$ = fromEvent(document, "keyup");
  keydown$
  .pipe(
    filter(event => event.key === 'ArrowLeft' || event.key === 'ArrowRight' || (event.key === ' ' && !isJumping)),
    map(event => event.key)
  )
  .subscribe((key) => {
    if (key === 'ArrowLeft') {
      moveLeft = true;
    } else if (key === 'ArrowRight') {
      moveRight = true;
    } else if (key === ' ' && !isJumping) {
      jumpSpeed = jumpPower;
      isJumping = true;
      
    }
  });

  keyup$
  .pipe(
    filter(event => event.key === 'ArrowLeft' || event.key === 'ArrowRight'),
    map(event => event.key)
  ).subscribe((key) => {
    if (key === 'ArrowLeft') {
      moveLeft = false;
    } else if (key === 'ArrowRight') {
      moveRight = false;
    } else if (key === ' ') {
      jump = false;
    }
  });

  app.ticker.add( async () => {
    if (moveLeft && superMario.x > 0) {
      // Here we are moving Mario to the left and he cant go out of the canvas
      superMario.x -= 3;
    } else if (
      moveRight &&
      superMario.x < app.canvas.width - superMario.width // Here we are moving Mario to the right and he cant go out of the canvas
    ) {
      superMario.x += 3;
    }

    if (isJumping) {
      superMario.y += jumpSpeed;
      jumpSpeed += gravity;

      if (superMario.y >= app.canvas.height - superMario.height) {
        // Here we are making sure Mario is not going out of the top of the canvas
        superMario.y = app.canvas.height - superMario.height;
        isJumping = false;
        jumpSpeed = 0;
      }
    } else {
      const texture = await Assets.load(currentPicture);
      superMario.texture = texture;
    }
  });

  document.body.appendChild(app.canvas);
})();
