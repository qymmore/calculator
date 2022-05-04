const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');
const clearButton = document.querySelector('#clear-button');
const deleteButton = document.querySelector('#delete-button');
const equalsButton = document.querySelector('#equals-button');
const decimalButton = document.querySelector('#decimal-button');

const displayScreen = document.querySelector('.display-screen');
const currentOperand = document.querySelector('.current-operand');
const previousOperand = document.querySelector('.previous-operand');

const calculator = {
    displayValue: '0',
    firstOperand: null,
    secondOperand: false,
    chosenOperator: null,
}

//default screen should always display 0
function defaultDisplay() {
    displayScreen.textContent = calculator.displayValue;
}
defaultDisplay();

//display clicked numbers and operators on screen
function displayNumbers () {
    numberButtons.forEach((number) => {
        number.addEventListener('click', function() {
            if(displayScreen.textContent === '0') {
                displayScreen.textContent = number.value; //if display shows 0 change the display value to the number pressed
            } else {
                calculator.displayValue = number.value;
                displayScreen.textContent += calculator.displayValue;
            }
        })
    });
}
displayNumbers();

function displayOperators () {
    operatorButtons.forEach((operator) => {
        operator.addEventListener('click', function() {
            calculator.displayValue = operator.value;
            displayScreen.textContent += calculator.displayValue;
        })
    });
}
displayOperators();

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

