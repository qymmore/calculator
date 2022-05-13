const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');
const clearButton = document.querySelector('#clear-button');
const deleteButton = document.querySelector('#delete-button');
const equalsButton = document.querySelector('#equals-button');
const decimalButton = document.querySelector('#decimal-button');
const negativeButton = document.querySelector('#negative-button');

const displayScreen = document.querySelector('.display-screen');
const currentOperand = document.querySelector('.current-operand');
const previousOperand = document.querySelector('.previous-operand');

currentOperand.textContent = '';
previousOperand.textContent = '';

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
                displayScreen.textContent = number.value; //if display shows 0 change the display value to the number pressed
                calculator.firstOperand = displayScreen.textContent; //store the first number in firstOperand
                console.log(calculator.firstOperand);
            } else if(calculator.firstOperand != null && calculator.secondOperand === null && calculator.chosenOperator != null) {
                calculator.displayValue = number.value;
                displayScreen.textContent += calculator.displayValue;
                calculator.secondOperand = number.value; //store secondOperand if operator and first operand are not null
                console.log(calculator.secondOperand);
            } else if(calculator.secondOperand != null && calculator.firstOperand != null && calculator.chosenOperator != null) {
                calculator.displayValue = number.value;
                displayScreen.textContent += calculator.displayValue;
                calculator.secondOperand += number.value ;
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
            if(calculator.firstOperand != null && calculator.chosenOperator === null) { 
                calculator.displayValue = operator.value; 
                displayScreen.textContent += calculator.displayValue; 
                calculator.chosenOperator = operator.value; //save operator to chosenOperator
                console.log(calculator.chosenOperator);
            } else if(calculator.chosenOperator != null) { 
                alert("CANNOT SELECT MORE THAN ONE OPERATOR FOR NOW"); 
            } else {
                return null;
            }
        })
    });
    decimalButton.addEventListener('click', e => {
        if(!calculator.displayValue.includes('.')) {
            calculator.displayValue = decimalButton.value;
            displayScreen.textContent += calculator.displayValue;
        } else if(calculator.displayValue.includes('.')){
            return alert("Cannot have multiple decimal points");
        } else {
            return null;
        }
    })
    equalsButton.addEventListener('click', e => {
        calculator.displayValue = operate(calculator.chosenOperator, calculator.firstOperand, calculator.secondOperand);
        displayScreen.textContent = calculator.displayValue;
    });
}

displayAll();

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
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return (a / b).toFixed(2);
};

function percent(a) {
    return a / 100;
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

