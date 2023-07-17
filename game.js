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

// It is easy to assign an anonymous function to another variable
paper.view.onKeyDown = function (event) {
  if (event.key === "left") {
    if (player.bounds.left > 0) { //creating a left boundary
      player.position.x -= 10;
    }
  } else if (event.key === "right") { //creating a right boundary
    if (player.bounds.right < paper.view.size.width) {
      player.position.x += 10;
    }
  }
};

//Detect collisions
function detectCollisions(){
  if(player.intersects(blueEnemy)){
    lives --
    if(lives == 0){
      gameOver = true;
    }
  } else {
    blueEnemy.position.y = 1
  }
}

function update(){
  if(!gameover){
    blueEnemy.position.y += 5;
    if(blueEnemy.postion.y > paper.view.size.height){
      score ++
      blueEnemy.position.y =1
    }
  }
}