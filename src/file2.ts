import "./file2.html";

function appendOperation(operation) {
    document.getElementById('resultArea').innerHTML += operation;
}

function calculateResult() {
    let container = document.getElementById('resultArea');
    let result = eval(container.innerHTML);
    container.innerHTML = result;
}

function deleteLast() {
    let container = document.getElementById('resultArea');
    if (container.innerHTML.endsWith(' ')) {
        container.innerHTML = container.innerHTML.slice(0, -3);
    } else {
        container.innerHTML = container.innerHTML.slice(0, -1);
    }
}

function deleteAll() {
    let container = document.getElementById('resultArea');
    container.innerHTML = '';
}

function SquareRoot() {
    var val = this.resultArea;
    let resultArea = Math.sqrt(val);
}

function ExponentofNumber() {
    var val = this.resultArea;
    let resultArea = Math.pow(val, 2);
}