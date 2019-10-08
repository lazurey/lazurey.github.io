(function($) {
  var context, snake, move;
  var picked, apple;

  var $board = $('.board');

  var WALL = 400, STEP = 10,
      UP = 'moving up', DOWN = 'moving down', LEFT = 'moving left', RIGHT = 'moving right';

  function Snake() {
    this.x = 0;
    this.y = 0;
    this.fill = '#336774';
    this.direction = RIGHT;
    this.body = [];
    this.length = 10;
  }

  function init() {
    context = document.getElementById('learning').getContext('2d');
    snake = new Snake();

    for (var i = 0; i < 10; i++) {
      snake.x += STEP;
      setSnake();
    }
    feed();
    move = setInterval(crawl, 200);
  }

  function feed() {
    var x = parseInt(Math.random() * (WALL / STEP - 1)) * STEP,
        y = parseInt(Math.random() * (WALL / STEP - 1)) * STEP;
    picked = colors[parseInt(Math.random() * 65536) % colors.length];
    apple = {
      x: x,
      y: y,
      code: picked.code
    }
    $board.find('.name').text(picked.name);
    $board.find('.kana').text(picked.kana);
    $board.find('.rome').text(picked.rome);

    context.fillStyle = picked.code
    context.fillRect(x, y, STEP, STEP);
  }

  function grow() {
    look();
    snake.body.push({x: apple.x, y: apple.y, width: STEP, height: STEP});
    snake.x = apple.x;
    snake.y = apple.y;
    snake.length++;
    console.log(snake);
  }

  function eat() {
    if (snake.x == apple.x && snake.y == apple.y) {
      snake.fill = apple.code;
      grow();
      feed();
      return true;
    }
    return false;
  }

  function setSnake() {
    context.fillStyle = snake.fill;
    context.fillRect(snake.x, snake.y, STEP, STEP);
    snake.body.push({x: snake.x, y: snake.y, width: STEP, height: STEP});
  }

  function clearSnake() {
    var tail = snake.body.shift()
    context.clearRect(tail.x, tail.y, tail.width, tail.height); 
  }

  function look() {
    switch (snake.direction) {
      case UP:
        snake.y -= STEP;
        break;
      case DOWN:
        snake.y += STEP;
        break;
      case LEFT:
        snake.x -= STEP;
        break;
      case RIGHT:
        snake.x += STEP;
        break;
      default:
        break;
    }
  }

  function crawl() {
    clearSnake();
    look();
    eat();
    setSnake();
    if (!check()) {
      died();
    }
  }

  function check() {
    return (snake.x < WALL &&
            snake.y < WALL &&
            snake.x >= 0 &&
            snake.y >= 0);
  }

  function died() {
    clearInterval(move)
    context.font = "20px serif";
    context.fillText("Game Over", WALL / 2 - 50, 50);
  }

  function play() {
    $('body').keydown(function(e) {
      var key = e.which;
      var turn;
      var current = snake.direction;
      switch(key) {
        case 38:
          turn = (current !== DOWN) ? UP : DOWN;
          break;
        case 40:
          turn = (current !== UP) ? DOWN : UP;
          break;
        case 37:
          turn = (current !== RIGHT) ? LEFT : RIGHT;
          break;
        case 39:
          turn = (current !== LEFT) ? RIGHT : LEFT;
          break; 
        default:
          return;
          break;
      }
      snake.direction = turn;
    })
  }


  $(document).ready(function() {
    init();
    play();
  });

})(jQuery || window.jQuery);
