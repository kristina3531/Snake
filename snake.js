let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

//Создаем ячейки
for(let i = 1; i < 101; i++) {
  let excel = document.createElement('div');
  field.appendChild(excel);
  excel.classList.add('excel');
}

//Присваиваем 2 атрибута каждой ячейке — положение по осям x и y
let excel = document.getElementsByClassName('excel');

let x = 1,
    y = 10;

for(let i = 0; i < excel.length; i++) {
  if(x > 10) {
    x = 1;
    y--;
  }
  excel[i].setAttribute('posX', x);
  excel[i].setAttribute('posY', y);
  x++;
}

//Змейка появляются в рандомных местах
function generateSnake() {
  let posX = Math.round(Math.random() * (10 - 3) + 3);
  let posY = Math.round(Math.random() * (10 - 1) + 1);
  return [posX, posY];
}

let coordinates = generateSnake();

//Создание змейки
let snakeBody = [
  document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'),
  document.querySelector('[posX = "' + (coordinates[0] -1) + '"][posY = "' + coordinates[1] + '"]'),
  document.querySelector('[posX = "' + (coordinates[0] -2) + '"][posY = "' + coordinates[1] + '"]')
];

for(let i = 0; i < snakeBody.length; i++) {
  snakeBody[i].classList.add('snake-body');
}
snakeBody[0].classList.add('snake-head');

//Создаем мышь

let mouse;

function createMouse() {
  function generateMouse() {
    let posX = Math.round(Math.random() * (10 - 1) + 1);
    let posY = Math.round(Math.random() * (10 - 1) + 1);
    return [posX, posY];
  }
  let mouseCoordinates = generateMouse();
  mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');

  //генерируется рандомно в поле, не занятым змеей
  while(mouse.classList.contains('snake-body')) {
    let mouseCoordinates = generateMouse();
    mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');
  }

  mouse.classList.add('mouse');
}
createMouse();

let direction = 'right';

function move() {
  let snakeCoordinates = [snakeBody[0].getAttribute('posX'),snakeBody[1].getAttribute('posY')];
  snakeBody[0].classList.remove('snake-head');
  snakeBody[snakeBody.length - 1].classList.remove('snake-body');
  snakeBody.pop();

  if(direction == 'right') {
    if(snakeCoordinates[0] < 10) {
      snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
    } else {
      snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));
    }
  } else if(direction == 'left') {
      if(snakeCoordinates[0] > 1) {
        snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
      } else {
        snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCoordinates[1] + '"]'));
      }
  } else if(direction == 'up') { 
      if(snakeCoordinates[1] < 10) {
        snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] + 1) + '"]'));
      } else {
          snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'));
        }
    } else if(direction == 'down') { 
        if(snakeCoordinates[1] > 1) {
          snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] - 1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "10"]'));
          }
      }

  if(snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')) {
    mouse.classList.remove('mouse');
    let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
    let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
    snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
    createMouse();
  }

  //Условия окончания игры - голова упирается в тело
  if(snakeBody[0].classList.contains('snake-body')) {
    alert('Игра окончена!');
    clearInterval(interval);
  }
  
  snakeBody[0].classList.add('snake-head');
  for(let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add('snake-body');
  }
}

let interval = setInterval(move, 300); 

window.addEventListener('keydown', function(e) {
  // console.log(e.keyCode);

  //Стрелка влево
  if(e.keyCode == 37 && direction != 'right') {
    direction = 'left';
  }
  //Стрелка вверх
  else if(e.keyCode == 38 && direction != 'down') {
    direction = 'up';
  }
  //Стрелка вправо
  else if(e.keyCode == 39 && direction != 'left') {
    direction = 'right';
  }
  //Стрелка вниз
  else if(e.keyCode == 40 && direction != 'up') {
    direction = 'down';
  }
});