import {
  Engine,
  Render,
  Bodies,
  Runner,
  MouseConstraint,
  Mouse,
  Composite,
  Composites,
  Common,
} from "matter-js";

// create engine
const engine = Engine.create();
const world = engine.world;

// create renderer
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 800,
    height: 600,
    wireframes: false,
    // showAngleIndicator: true,
  },
});

Render.run(render);

// create runner
const runner = Runner.create();
Runner.run(runner, engine);

// add bodies
const stack = Composites.stack(20, 20, 20, 5, 0, 0, (x: number, y: number) => {
  return Bodies.circle(x, y, Common.random(10, 20), {
    friction: 0.00001,
    restitution: 0.5,
    density: 0.001,
  });
});

Composite.add(world, stack);

Composite.add(world, [
  Bodies.rectangle(200, 150, 700, 20, {
    isStatic: true,
    angle: Math.PI * 0.06,
    render: { fillStyle: "#063a19" },
  }),
  Bodies.rectangle(500, 350, 700, 20, {
    isStatic: true,
    angle: -Math.PI * 0.06,
    render: { fillStyle: "#063a19" },
  }),
  Bodies.rectangle(340, 580, 700, 20, {
    isStatic: true,
    angle: Math.PI * 0.04,
    render: { fillStyle: "#063a19" },
  }),
]);

// add mouse control
const mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    // constraint: {
    //   stiffness: 0.2,
    //   render: {
    //     visible: false,
    //   },
    // },
  });

Composite.add(world, mouseConstraint);

// keep the mouse in sync with rendering
// render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, Composite.allBodies(world));

// // wrapping using matter-wrap plugin
// stack.bodies.forEach((body) => {
//   body.plugin.wrap = {
//     min: { x: render.bounds.min.x, y: render.bounds.min.y },
//     max: { x: render.bounds.max.x, y: render.bounds.max.y },
//   };
// });
