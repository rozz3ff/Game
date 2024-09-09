// получаем элементы по его ID
const chel = document.getElementById("chel");
const smallBottle = document.getElementById("small-bottle");
const bigBottle = document.getElementById("big-bottle");

// функция прыжка
function jump() {
  if (!gameStarted) return;
 // проверяем, не находится ли динозаврик в прыжке
 if (chel.classList != "jump") {
   // добавляем класс jump для начала анимации прыжка
   chel.classList.add("jump");

   // удаляем класс jump через 300 миллисекунд, чтобы завершить прыжок
   setTimeout(function () {
     chel.classList.remove("jump");
   }, 600);
 }
}

// добавляем обработчик событий
document.addEventListener("keydown", function (event) {
   // проверяем, была ли нажата клавиша пробела
   if (event.key === " ") {
     // если пробел нажат, вызываем функцию jump()
     jump();
   }
 });


let score = 0;
let gameStarted = false;
const scoreDisplay = document.getElementById("score");


function startGame() {
  gameStarted = true;
  smallBottle.style.animationPlayState = 'running';
  bigBottle.style.animationPlayState = 'running';
  score = 0;  // Обнуляем счёт при старте игры
  scoreDisplay.textContent = "Score: " + score;  // Обновляем отображение счёта
}

document.addEventListener("keydown", function (event) {
  if (event.key === " " && !gameStarted) {
    startGame();
  } else if (event.key === " " && gameStarted) {
    jump();
  }
});

function updateScore() {
  if (gameStarted) {
    score++;
    scoreDisplay.textContent = "Score: " + score;  // Обновляем счёт на экране
  }
}

setInterval(updateScore, 100); // обновляем счёт каждые 100 мс

// Случайное появление большого или маленького кактуса с изображением
function spawnBottle() {
  const isBigBottle = Math.random() > 0.7;  // 30% шанс на большой кактус

  if (isBigBottle) {
    smallBottle.style.display = "none";  // Скрываем маленький кактус
    bigBottle.style.display = "block";   // Показываем большой кактус
  } else {
    bigBottle.style.display = "none";    // Скрываем большой кактус
    smallBottle.style.display = "block"; // Показываем маленький кактус
  }
}

setInterval(spawnBottle, 2000); // Меняем кактус каждые 2 секунды

function checkCollision() {
  // Получаем размеры и позиции элементов
  const chelRect = chel.getBoundingClientRect();
  const smallBottleRect = smallBottle.getBoundingClientRect();
  const bigBottleRect = bigBottle.getBoundingClientRect();

  // Проверяем столкновение с маленьким кактусом
  if (smallBottle.style.display === "block" &&
    chelRect.right > smallBottleRect.left &&
    chelRect.left < smallBottleRect.right &&
    chelRect.bottom > smallBottleRect.top &&
    chelRect.top < smallBottleRect.bottom) {
    alert("GG!");
    resetGame();
  }

  // Проверяем столкновение с большим кактусом
  if (bigBottle.style.display === "block" &&
    chelRect.right > bigBottleRect.left &&
    chelRect.left < bigBottleRect.right &&
    chelRect.bottom > bigBottleRect.top &&
    chelRect.top < bigBottleRect.bottom) {
    alert("Потрачено!");
    resetGame();
  }
}

// Вызов функции проверки столкновения каждую 10 миллисекунд
setInterval(checkCollision, 10);


function resetGame() {
  gameStarted = false;
  smallBottle.style.animationPlayState = 'paused';
  bigBottle.style.animationPlayState = 'paused';
  smallBottle.style.display = "none";
  bigBottle.style.display = "none";
  score = 0;
  scoreDisplay.textContent = "Score: " + score;
}

smallBottle.style.animationPlayState = 'paused';
bigBottle.style.animationPlayState = 'paused';