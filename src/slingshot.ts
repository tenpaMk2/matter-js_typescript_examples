import {
  Engine,
  Render,
  Bodies,
  Runner,
  Events,
  Constraint,
  MouseConstraint,
  Mouse,
  World,
  Composites,
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
  },
});

Render.run(render);

// create runner
const runner = Runner.create();
Runner.run(runner, engine);

// add bodies
const ground = Bodies.rectangle(395, 600, 815, 50, { isStatic: true });
const rockOptions = { density: 0.004 };
let rock = Bodies.polygon(170, 450, 2, 20, rockOptions);
const anchor = { x: 170, y: 450 };
const elastic = Constraint.create({
  pointA: anchor,
  bodyB: rock,
  stiffness: 0.005,
});

const pyramid = Composites.pyramid(
  500,
  300,
  9,
  10,
  0,
  0,
  (x: number, y: number) => {
    return Bodies.rectangle(x, y, 25, 40);
  }
);

const ground2 = Bodies.rectangle(610, 250, 200, 20, { isStatic: true });

const pyramid2 = Composites.pyramid(
  550,
  0,
  5,
  10,
  0,
  0,
  function (x: number, y: number) {
    return Bodies.rectangle(x, y, 25, 40);
  }
);

World.add(engine.world, [ground, pyramid, ground2, pyramid2, rock, elastic]);

// add mouse control
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  //   constraint: {
  //     stiffness: 0.2,
  //     render: {
  //       visible: false,
  //     },
  //   },
});
mouseConstraint.constraint.stiffness = 0.02;

World.add(world, mouseConstraint);

Events.on(engine, "afterUpdate", () => {
  if (
    mouseConstraint.mouse.button === -1 &&
    (190 < rock.position.x || rock.position.y < 430)
  ) {
    rock = Bodies.polygon(170, 450, 7, 20, rockOptions);
    World.add(engine.world, rock);
    elastic.bodyB = rock;
  }
});

// // keep the mouse in sync with rendering
// render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
  min: { x: 0, y: 0 },
  max: { x: 800, y: 600 },
});
