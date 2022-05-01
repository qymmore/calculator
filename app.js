const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');
const clearButton = document.querySelector('#clear-button');
const deleteButton = document.querySelector('#delete-button');
const equalsButton = document.querySelector('#equals-button');
const decimalButton = document.querySelector('#decimal-button');

const displayContainer = document.querySelector('#display-container');
const currentOperand = document.querySelector('.current-operand');

let storedNumber = '';
currentOperand.textContent = 0;


//display clicked numbers on screen
numberButtons.forEach((number) => {
    number.addEventListener('click', function() {
        storedNumber += number.value;
        currentOperand.textContent = storedNumber;
    })
});


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
}

