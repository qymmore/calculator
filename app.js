const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');
const clearButton = document.querySelector('#clear-button');
const deleteButton = document.querySelector('#delete-button');
const equalsButton = document.querySelector('#equals-button');
const decimalButton = document.querySelector('#decimal-button');

const displayScreen = document.querySelector('.display-screen');
const currentOperand = document.querySelector('.current-operand');
const previousOperand = document.querySelector('.previous-operand');

currentOperand.textContent = '';
previousOperand.textContent = '';

const calculator = {
    displayValue: '0', //default display screen value should be this
    firstOperand: null,
    secondOperand: null,
    chosenOperator: null,
}

//default screen should always display 0
function defaultDisplay() {
    displayScreen.textContent = calculator.displayValue;
}
defaultDisplay();


//display clicked numbers and operators on screen and also save their values 
function displayAll () {
    numberButtons.forEach((number) => {
        number.addEventListener('click', function() {
            if(displayScreen.textContent === '0') {
                displayScreen.textContent = number.value; //if display shows 0 change the display value to the number pressed
                calculator.firstOperand = displayScreen.textContent; //store the first number in firstOperand
                console.log(calculator.firstOperand);
            } else if(calculator.firstOperand != null && calculator.secondOperand === null && calculator.chosenOperator != null) {
                calculator.displayValue = number.value;
                displayScreen.textContent += calculator.displayValue;
                calculator.secondOperand = displayScreen.textContent; //store secondOperand if operator and first operand are not null
                console.log(calculator.secondOperand);
            } else {
                calculator.displayValue = number.value;
                displayScreen.textContent += calculator.displayValue;
                calculator.firstOperand = displayScreen.textContent; //store all consecutive digits into firstOperand
                console.log(calculator.firstOperand);
            }
        })
    });
    operatorButtons.forEach((operator) => {
        operator.addEventListener('click', function() {
            if(calculator.firstOperand != null && calculator.chosenOperator === null) { //if calculator display is not zero and firstOperand is not null
                calculator.displayValue = operator.value; //display value will be the operator value pressed
                displayScreen.textContent += calculator.displayValue; //update display screen
                calculator.chosenOperator = displayScreen.textContent; //save operator to chosenOperator
                console.log(calculator.chosenOperator);
            } else {
                alert("ERROR CANNOT HAVE MORE THAN TWO OPERANDS AND AN OPERATOR FOR NOW");
            }
        })
    });
}

displayAll();

//run the evaluate function when clicking on equal button
/*equalsButton.addEventListener('click', function() {
    evaluate();
});*/

//clear the display screen back to 0
function clearDisplay() {
    clearButton.addEventListener('click', () => {
        if(displayScreen.textContent != "0") {
            displayScreen.textContent = '0';
        } else {
            return;
        }
    });
};
clearDisplay();


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
            else return divide(a, b);
        case '%':
            return percent(a);
        case '√':
            return squareRoot(a);
        default:
            return null;
    }
};

