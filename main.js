class SpawnedEntity extends HTMLDivElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }
}

customElements.define("spawned-entity", SpawnedEntity);

const jumper = document.querySelector("#jumper");
const spawningPlace = document.querySelector("#spawner");

// The amount of time in seconds in which an obstacle will move
// TODO: Make is progresively shorter
const OBSTACLE_LIFETIME = 3;

/**
 * Calculate the collision status between two entities depending on their positions
 * and widths.
 * @param rect1 - Rect for first entity
 * @param rect2 - Rect for second entity
 *
 * @returns - Collision Status
 */
const checkCollision = (rect1, rect2) => {
  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top &&
    rect1.top < rect2.bottom
  );
};

const jump = () => {
  jumper.classList.add("is-jumping");
};

const unJump = () => {
  if (jumper.classList.contains("is-jumping")) {
    jumper.classList.remove("is-jumping");
  }
};

const unMount = (entity) => {
  if (entity.classList.contains("move")) {
    entity.classList.remove("move");
  }

  spawningPlace.removeChild(entity);
};

const spawnObstacle = () => {
  const spawnedElm = document.createElement("spawnedentity");
  spawningPlace.appendChild(spawnedElm);

  setInterval(() => {
    const jumperRectData = jumper.getBoundingClientRect();
    const spawnedElmRectData = spawnedElm.getBoundingClientRect();

    if (checkCollision(jumperRectData, spawnedElmRectData)) {
      console.log("Collided!");
    }
  }, 100);

  setTimeout(() => {
    spawnedElm.classList.add("move");
  }, 0);

  setTimeout(() => {
    unMount(spawnedElm);
  }, 3000);
};

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("keydown", (e) => {
    if (e.key === " ") {
      jump();
    }
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === " ") {
      unJump();
    }
  });

  setInterval(() => {
    spawnObstacle();
  }, 3000);
});
