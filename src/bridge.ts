import {
  Engine,
  Render,
  Bodies,
  Runner,
  MouseConstraint,
  Mouse,
  Composite,
  Composites,
  Body,
  Constraint,
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
    wireframes: true,
    // showAngleIndicator: true,
  },
});

Render.run(render);

// create runner
const runner = Runner.create();
Runner.run(runner, engine);

// add bodies
const group = Body.nextGroup(true);

var bridge = Composites.stack(160, 290, 15, 1, 0, 0, (x: number, y: number) => {
  return Bodies.rectangle(x - 300, y, 53, 20, {
    collisionFilter: { group: group },
    // chamfer: 5,
    density: 0.005,
    frictionAir: 0.05,
    render: {
      fillStyle: "#363a19",
    },
  });
});

Composites.chain(bridge, 0.3, 0, -0.3, 0, {
  stiffness: 1,
  length: 0,
  render: {
    visible: true,
  },
});

var stack = Composites.stack(250, 50, 6, 3, 0, 0, (x: number, y: number) => {
  return Bodies.rectangle(x, y, 50, 50);
});

Composite.add(world, [
  bridge,
  stack,
  Bodies.rectangle(30, 490, 220, 380, {
    isStatic: true,
    chamfer: { radius: 20 },
  }),
  Bodies.rectangle(770, 490, 220, 380, {
    isStatic: true,
    chamfer: { radius: 20 },
  }),
  Constraint.create({
    pointA: { x: 140, y: 300 },
    bodyB: bridge.bodies[0],
    pointB: { x: -25, y: 0 },
    length: 2,
    stiffness: 0.9,
  }),
  Constraint.create({
    pointA: { x: 660, y: 300 },
    bodyB: bridge.bodies[bridge.bodies.length - 1],
    pointB: { x: 25, y: 0 },
    length: 2,
    stiffness: 0.9,
  }),
]);

// add mouse control
const mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    // constraint: {
    //   stiffness: 0.1,
    //   render: {
    //     visible: false,
    //   },
    // },
  });

Composite.add(world, mouseConstraint);

// // keep the mouse in sync with rendering
// render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
  min: { x: 0, y: 0 },
  max: { x: 800, y: 600 },
});
