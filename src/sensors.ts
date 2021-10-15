import {
  Engine,
  Render,
  Bodies,
  Runner,
  MouseConstraint,
  Mouse,
  Composite,
  Events,
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
  },
});

Render.run(render);

// create runner
const runner = Runner.create();
Runner.run(runner, engine);

// add bodies
const colorA = "#f55a3c",
  colorB = "#f5d259";

const collider = Bodies.rectangle(400, 300, 500, 50, {
  isSensor: true,
  isStatic: true,
  render: {
    strokeStyle: colorA,
    fillStyle: "transparent",
    lineWidth: 1,
  },
});

Composite.add(world, [
  collider,
  Bodies.rectangle(400, 600, 800, 50, {
    isStatic: true,
    render: {
      fillStyle: "#060a19",
      lineWidth: 0,
    },
  }),
]);

Composite.add(
  world,
  Bodies.circle(400, 40, 30, {
    render: {
      strokeStyle: colorB,
      fillStyle: "transparent",
      lineWidth: 1,
    },
  })
);

Events.on(engine, "collisionStart", function (event) {
  const pairs = event.pairs;

  for (let i = 0, j = pairs.length; i != j; ++i) {
    const pair = pairs[i];

    if (pair.bodyA === collider) {
      pair.bodyB.render.strokeStyle = colorA;
    } else if (pair.bodyB === collider) {
      pair.bodyA.render.strokeStyle = colorA;
    }
  }
});

Events.on(engine, "collisionEnd", function (event) {
  const pairs = event.pairs;

  for (let i = 0, j = pairs.length; i != j; ++i) {
    let pair = pairs[i];

    if (pair.bodyA === collider) {
      pair.bodyB.render.strokeStyle = colorB;
    } else if (pair.bodyB === collider) {
      pair.bodyA.render.strokeStyle = colorB;
    }
  }
});

// add mouse control
var mouse = Mouse.create(render.canvas),
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
Render.lookAt(render, {
  min: { x: 0, y: 0 },
  max: { x: 800, y: 600 },
});
