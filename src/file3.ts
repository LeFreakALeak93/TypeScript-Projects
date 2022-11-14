import "./file3.html";

let canvas = document.getElementById('canvas') as HTMLCanvasElement; // Initalisieren der Variablen
let ctx = canvas.getContext('2d');
let rows = 20;
let cols = 20;
let snake = [{
    x: 19,
    y: 3
}];

let food;

let cellWidth = canvas.width / cols;
let cellHeight = canvas.height / rows;
let direction = 'LEFT';
let foodCollected = false;

placeFood();

setInterval(gameLoop, 200); // Aufrufen der Funktion 'gameLoop' zehnmal die Sekunde
document.addEventListener('keydown', keyDown); // Ausführen der Funktion 'keyDown' beim Event 'keydown' (gedrückter Keyboard-Taste)


draw();

function draw() {
    ctx!.fillStyle = 'black';
    ctx!.fillRect(0, 0, canvas.width, canvas.height); // schwarzes Rechteck erzeugen
    ctx!.fillStyle = 'lightgreen'; // Schlangenkopf wird rot gemalt

    add(snake[0].x, snake[0].y);

    let restlicheSchlange = snake.slice(1) // Restliche Schlange bleibt weiß
    ctx!.fillStyle = 'white';

    restlicheSchlange.forEach(part => add(part.x, part.y));

    ctx!.fillStyle = 'yellow';
    add(food.x, food.y); // Food

    requestAnimationFrame(draw); // Aktualisieren der Animation über Callback der Funktion draw   
}

function testGameOver() {

    let firstPart = snake[0];
    let otherParts = snake.slice(1);
    let duplicatePart = otherParts.find(part => part.x == firstPart.x && part.y == firstPart.y);

    // 1. Schlange läuft gegen die Wand
    if (snake[0].x < 0 ||
        snake[0].x > cols - 1 ||
        snake[0].y < 0 ||
        snake[0].y > rows - 1 ||
        duplicatePart
    ) {
        placeFood();
        snake = [{
            x: 19,
            y: 3
        }];
        direction = 'LEFT';
    }
}


function placeFood() { // generiert eine Zufallszahl zwischen 0 und 1, rundet diese ab und speichert das Ergebnis in der Variablen randomX/randomY
    let randomX = Math.floor(Math.random() * cols);
    let randomY = Math.floor(Math.random() * rows);

    food = {
        x: randomX, // Übergabe der Variablen an x und y
        y: randomY
    };
}

function add(x, y) {
    ctx!.fillRect(x * cellWidth, y * cellHeight, cellWidth - 1, cellHeight - 1); // Erzeugen eines Rechtecks in Abhängigkeit der Zellenhöhe und -breite
}

function shiftSnake() {
    for (let i = snake.length - 1; i > 0; i--) { // Updaten der Schlange: Startpunkt Index 3
        const part = snake[i]; // 3. Index der Schlange
        const lastPart = snake[i - 1]; // 2. Index der Schlange
        part.x = lastPart.x; // Herüberkopieren der Werte vom 2. Index auf den 3. Index
        part.y = lastPart.y;

    }
}

function gameLoop() { // Aktualisieren der x- und y-Koordinate je nach Richtung
    testGameOver();
    if (foodCollected) { // Wenn Food eingesammelt wurde, wird Schlange um eins erweitert
        snake = [{
            x: snake[0].x,
            y: snake[0].y
        }, ...snake];

        foodCollected = false;
    }

    shiftSnake();
    if (direction == 'LEFT') {
        snake[0].x--;
    }
    if (direction == 'RIGHT') {
        snake[0].x++;
    }
    if (direction == 'UP') {
        snake[0].y--;
    }
    if (direction == 'DOWN') {
        snake[0].y++;
    }

    if (snake[0].x == food.x && // Übereinstimmung der SnakeX-/SnakeY-Koordinate mit food.x/food.y
        snake[0].y == food.y) {
        foodCollected = true;
        // Futter einsammeln
        placeFood();
    }
}

function keyDown(e) { // Event 'Pfeiltasten gedrückt' und Verändern der entsprechenden Richtung
    if (e.keyCode == 37) {
        direction = 'LEFT';
    }
    if (e.keyCode == 38) {
        direction = 'UP';
    }
    if (e.keyCode == 39) {
        direction = 'RIGHT';
    }
    if (e.keyCode == 40) {
        direction = 'DOWN';
    }
}