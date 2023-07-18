const canvas = document.getElementById("myCanvas");
canvas.width = 800;
canvas.height = 400;
paper.setup(canvas);

//Game variables
let score = 0;
let lives = 3;
let gameOver = false;

// create player
const player = new paper.Path.Rectangle({
  size: [40, 40],
  fillColor: "red",
  point: [paper.view.center.x - 20, paper.view.size.height - 40],
});

// create enemy
const blueEnemy = new paper.Path.Rectangle({
  size: [40.4],
  fillColor: "blue",
  point: [paper.view.center.x - 20, 10],
});

//create another enemy
const greenEnemy = new paper.Path.Rectangle({
  size: [40.4],
  fillColor: "green",
  point: [paper.view.center.x - 20, 10],
});


// It is easy to assign an anonymous function to another variable
paper.view.onKeyDown = function (event) {
  if (event.key === "left") {
    if (player.bounds.left > 0) {
      //creating a left boundary
      player.position.x -= 10;
    }
  } else if (event.key === "right") {
    //creating a right boundary
    if (player.bounds.right < paper.view.size.width) {
      player.position.x += 10;
    }
  }
};

//Detect collisions
function detectCollisions() {
  if (player.intersects(blueEnemy) || player.intersects(greenEnemy)) {
    lives--;
    console.log(lives);
    if (lives === 0) {
      gameOver = true;
      const reloadButton = document.createElement("button");
      reloadButton.id = "reload-button";
      reloadButton.innerText = "Play Again";
      reloadButton.addEventListener("click", function () {
        location.reload();
      });
      document.body.appendChild(reloadButton);
    } else {
      blueEnemy.position.y = 1; //The position from which the box falls
      greenEnemy.position.y=1;
    }
  }
}

function update() {
  if (!gameOver) {
    blueEnemy.position.y += 2; //The speed at which the box is falling i.e 2px per second
    greenEnemy.position.y +=4; // falling at 4px persecond
    if (blueEnemy.position.y > paper.view.size.height) {
      score++;
      blueEnemy.position.x =
        Math.random() * (paper.view.size.width - blueEnemy.bounds.width); //Making the enemy fall randomly but within the boundary
      blueEnemy.position.y = 1;
    }
    if (greenEnemy.position.y > paper.view.size.height) {
      score++;
      greenEnemy.position.x =
        Math.random() * (paper.view.size.width - blueEnemy.bounds.width); //Making the enemy fall randomly but within the boundary
      greenEnemy.position.y = 1;
    }
    detectCollisions();
  }

  //clear canvas
  paper.project.activeLayer.removeChildren();

  //Add player
  paper.project.activeLayer.addChild(player);

  //Add enemy
  paper.project.activeLayer.addChild(blueEnemy);
    paper.project.activeLayer.addChild(greenEnemy);

  //Score
  const scoreText = new paper.PointText({
    point: [10, 20],
    content: "Score: " + score,
    fillColor: "black",
    fontSize: 16,
  });

  //Lives
  const livesText = new paper.PointText({
    point: [10, 60],
    content: "Lives: " + lives,
    fillColor: "black",
    fontSize: 16,
  });
  paper.project.activeLayer.addChild(livesText);
  paper.project.activeLayer.addChild(scoreText);
}

paper.view.onFrame = function (event) {
  update();
};
