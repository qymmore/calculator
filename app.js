const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');
const clearButton = document.querySelector('#clear-button');
const deleteButton = document.querySelector('#delete-button');
const equalsButton = document.querySelector('#equals-button');
const decimalButton = document.querySelector('#decimal-button');
const negativeButton = document.querySelector('#negative-button');

const displayScreen = document.querySelector('.display-screen');

const calculator = {
    displayValue: '0', 
    firstOperand: null,
    secondOperand: null,
    chosenOperator: null,
}

function defaultDisplay() {
    displayScreen.textContent = calculator.displayValue;
}
defaultDisplay();

function displayAll () {
    numberButtons.forEach((number) => {
        number.addEventListener('click', function() {
            if(displayScreen.textContent === '0') {
                displayScreen.textContent = number.value; 
                calculator.firstOperand = displayScreen.textContent; 
                console.log(calculator.firstOperand);
            } else if(calculator.firstOperand != null && calculator.secondOperand === null && calculator.chosenOperator != null) {
                calculator.displayValue = number.value;
                displayScreen.textContent += calculator.displayValue;
                calculator.secondOperand = number.value; 
                console.log(calculator.secondOperand);
            } else if(calculator.secondOperand != null && calculator.firstOperand != null && calculator.chosenOperator != null) {
                calculator.displayValue = number.value;
                displayScreen.textContent += calculator.displayValue;
                calculator.secondOperand += number.value ;
                console.log(calculator.secondOperand);
            } else {
                calculator.displayValue = number.value;
                displayScreen.textContent += calculator.displayValue;
                calculator.firstOperand = displayScreen.textContent; 
                console.log(calculator.firstOperand);
            }
        })
    });
    operatorButtons.forEach((operator) => {
        operator.addEventListener('click', function() {
            if(calculator.firstOperand != null && calculator.chosenOperator === null && calculator.secondOperand === null) { 
                calculator.displayValue = operator.value; 
                displayScreen.textContent += calculator.displayValue; 
                calculator.chosenOperator = operator.value; 
                console.log(calculator.chosenOperator);
            } else if(calculator.firstOperand != null && calculator.chosenOperator != null && calculator.secondOperand != null) { 
                calculator.displayValue = operate(calculator.chosenOperator, calculator.firstOperand, calculator.secondOperand);
                displayScreen.textContent = calculator.displayValue;
                calculator.firstOperand = displayScreen.textContent;
                calculator.chosenOperator = null;
                calculator.secondOperand = null;
            } else {
                return null;
            }
        })
    });
    equalsButton.addEventListener('click', e => {
        calculator.displayValue = operate(calculator.chosenOperator, calculator.firstOperand, calculator.secondOperand);
        displayScreen.textContent = calculator.displayValue;
        calculator.firstOperand = displayScreen.textContent;
        calculator.chosenOperator = null;
        calculator.secondOperand = null;
    });
}
displayAll();

function decimal() {
    decimalButton.addEventListener('click', e => {
        if(calculator.firstOperand === null) {
            return alert("Error");
        } else if(!calculator.firstOperand.includes('.') && calculator.chosenOperator === null) {
            calculator.displayValue = decimalButton.value;
            displayScreen.textContent += calculator.displayValue;
            calculator.firstOperand = calculator.displayValue;
        } else if(!calculator.secondOperand.includes('.')) {
            calculator.displayValue = decimalButton.value;
            displayScreen.textContent += calculator.displayValue;
            calculator.secondOperand += calculator.displayValue;
        } else if(calculator.firstOperand.includes('.') || calculator.secondOperand.includes('.')) {
            return alert("Cannot have more than one decimal point per operand.");
        } else {
            return null;
        }
    });
}
decimal();

function negativeSign() {
    negativeButton.addEventListener('click', e => {
        if(calculator.firstOperand === null) {
            calculator.displayValue = negativeButton.value;
            displayScreen.textContent = calculator.displayValue;
            calculator.firstOperand = calculator.displayValue;
        } else if(calculator.secondOperand === null) {
            calculator.displayValue = negativeButton.value;
            displayScreen.textContent += calculator.displayValue;
            calculator.secondOperand = calculator.displayValue;
        } else {
            return null;
        }
    })
}
negativeSign();

function clearMemory() {
    clearButton.addEventListener('click', () => {
        if(displayScreen.textContent != "0") {
            calculator.displayValue = 0;
            calculator.firstOperand = null;
            calculator.secondOperand = null;
            calculator.chosenOperator = null;
            displayScreen.textContent = calculator.displayValue;
        } else {
            return;
        }
    });
};
clearMemory();


function add(a, b) {
    return (a + b).toFixed(1);
};

function subtract(a, b) {
    return (a - b).toFixed(1);
};

function multiply(a, b) {
    return (a * b).toFixed(2);
};

function divide(a, b) {
    return (a / b).toFixed(2);
};

function percent(a) {
    return (a / 100).toFixed(2);
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
            if(b === 0) return alert("HEY. That's against the laws.");
            else return divide(a, b);
        case '%':
            return percent(a);
        default:
            return null;
    }
};

