if ("ontouchstart" in document.documentElement)
{
  window.open("index-m.html","_self");
}
var element = document.body;
var footer = document.getElementById("footer")
var checkbox = document.getElementById("myCheck");
checkbox.addEventListener("change", function() {
if(checkbox.checked)
{
console.log("Check");
element.style.backgroundColor = "black";
footer.style.backgroundColor = "black";
footer.style.color = "white";
}
else
{
  console.log("no Check");
  element.style.backgroundColor = "gainsboro";
  footer.style.backgroundColor = "lightgrey";
footer.style.color = "black";
}
});
if(window.localStorage.getItem("high_score") == null)
{
window.localStorage.setItem("high_score", 0);
}
document.getElementById("highscore").innerHTML=window.localStorage.getItem("high_score");
const board_border = 'red';
const board_background = '#273445';
const snake_col = 'lightblue';
const snake_border = 'darkblue';
function clear_board() {
    const snakeboard = document.getElementById("snakeboard");
    const snakeboard_ctx = snakeboard.getContext("2d");
    snakeboard_ctx.fillStyle = board_background;
    snakeboard_ctx.strokestyle= board_border;
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}
clear_board();
document.getElementById("restart").addEventListener("click", game);

function game () {

  document.getElementById("scoreboard").innerHTML =0;
  function disableScroll() {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  
        // if any scroll is attempted, set this to the previous value
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}
disableScroll();


document.getElementById("restart").style.display = "none";
document.getElementById("highscore").innerHTML=window.localStorage.getItem("high_score");


let snake = [
    {x: 200, y: 200},
    {x: 190, y: 200},
    {x: 180, y: 200},
    {x: 170, y: 200},
    {x: 160, y: 200}
]

let score = 0;
let changing_direction = false;
let food_x;
let food_y;
let dx = 10;
let dy = 0;

const snakeboard = document.getElementById("snakeboard");
const snakeboard_ctx = snakeboard.getContext("2d");
clear_board();
drawSnake();



    main();
    gen_food();


document.addEventListener("keydown", change_direction);
function main() {
    var sc = parseInt(document.getElementById('scoreboard').innerHTML);
    var hs = parseInt(document.getElementById("highscore").innerHTML);
    if( sc > hs)
    {
    console.log("in");
    window.localStorage.setItem("high_score", score);
    document.getElementById("highscore").innerHTML=window.localStorage.getItem("high_score");
    }
    if (has_game_ended()){
        window.onscroll = function() {};
        document.getElementById("restart").style.display = "block";
        document.getElementById("restart").innerHTML = "Restart";
        return;
    }
    changing_direction=false;
    setTimeout(function onTick() {
    clear_board();
    draw_food();
    move_snake();
    drawSnake();
    main();
},100)
}

function clear_board() {
    snakeboard_ctx.fillStyle = board_background;
    snakeboard_ctx.strokestyle= board_border;
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

function drawSnake() {
    snake.forEach(drawSnakePart)
}

function draw_food() {
    snakeboard_ctx.fillStyle = 'lightgreen';
    snakeboard_ctx.strokestyle = 'darkgreen';
    snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
    snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
}

function drawSnakePart(snakePart){
    snakeboard_ctx.fillStyle = snake_col;
    snakeboard_ctx.strokestyle = snake_border;
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y , 10, 10);
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}
function has_game_ended() {
    for (let i = 4; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeboard.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeboard.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
  }

  function random_food(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
  }

  function gen_food() {
      food_x = random_food(0, snakeboard.width- 10);
      food_y = random_food(0, snakeboard.height-10);

      snake.forEach(function has_snake_eaten_food(part){
          const has_eaten = food_x == part.x && part.y == food_y;
          if(has_eaten) gen_food();
      });
  }

  function change_direction(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
      
    if (changing_direction) return;
    changing_direction = true;
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;
    if (keyPressed === LEFT_KEY && !goingRight) {
      dx = -10;
      dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
      dx = 0;
      dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
      dx = 10;
      dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
      dx = 0;
      dy = 10;
    }
  }

  function move_snake() {
      const head  = {x: snake[0].x +dx, y:snake[0].y+dy};
      snake.unshift(head);
      const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
      if(has_eaten_food) {
          score+=10;
          document.getElementById('scoreboard').innerHTML = score;
          gen_food();}
          else {
              snake.pop();
          }
      }
  
    }
