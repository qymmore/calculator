const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');
const clearButton = document.querySelector('#clear-button');
const deleteButton = document.querySelector('#delete-button');
const equalsButton = document.querySelector('#equals-button');
const decimalButton = document.querySelector('#decimal-button');

const displayContainer = document.querySelector('#display-container');
const currentOperand = document.querySelector('.current-operand');
const previousOperand = document.querySelector('.previous-operand');

let screenNumber = '';
let firstNumber = '';
let operatorChosen = '';
let result = '';

currentOperand.textContent = 0;


//display clicked numbers on screen
function displayNumbers () {
    numberButtons.forEach((number) => {
        number.addEventListener('click', function() {
            screenNumber += number.value;
            currentOperand.textContent = screenNumber;
        })
    });
}
displayNumbers();


function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function percent(a) {
    return a / 100;
};

function squareRoot(a) {
    return Math.sqrt(a);
};

//operator function

function operate(operator, a , b) {
    a = Number(a);
    b = Number(b);

    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            if(b === 0) return null
            else return divide(a, b)
        default:
            return null;
    }
};

