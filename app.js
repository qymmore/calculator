const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');
const clearButton = document.querySelector('#clear-button');
const deleteButton = document.querySelector('#delete-button');
const equalsButton = document.querySelector('#equals-button');
const decimalButton = document.querySelector('#decimal-button');
const negativeButton = document.querySelector('#negative-button');
const displayScreen = document.querySelector('.display-screen');

let currentOperand = document.querySelector('.current-operand');
let lastOperand = document.querySelector('.last-operand');


decimalButton.addEventListener('click', decimal);
negativeButton.addEventListener('click', negativeSign);
clearButton.addEventListener('click', clearMemory);
equalsButton.addEventListener('click', evaluate);

const calculator = {
    displayValue: '0', 
    firstOperand: null,
    secondOperand: null,
    chosenOperator: null,
}

function defaultDisplay() {
    currentOperand.textContent = calculator.displayValue;
    lastOperand.textContent = '';
    /*displayScreen.textContent = calculator.displayValue;*/
}
defaultDisplay();

numberButtons.forEach((number) => {
    number.addEventListener('click', function() {
        if(currentOperand.textContent === '0') {
            currentOperand.textContent = number.value; 
            calculator.firstOperand =  currentOperand.textContent; //store first number in firstOperand 
            console.log(calculator.firstOperand);
        } else if(calculator.firstOperand != null && calculator.secondOperand === null && calculator.chosenOperator != null) {
            calculator.displayValue = number.value;
            currentOperand.textContent = calculator.displayValue;
            calculator.secondOperand = number.value; //if secondOperand is empty store the numbers in secondOperand
            lastOperand.textContent += calculator.chosenOperator;
            console.log(calculator.secondOperand);
        } else if(calculator.secondOperand != null && calculator.firstOperand != null && calculator.chosenOperator != null) {
            calculator.displayValue = number.value;
            currentOperand.textContent += calculator.displayValue;
            calculator.secondOperand += number.value ; //store all consecutive numbers in secondOperand
            console.log(calculator.secondOperand);
        } else {
            calculator.displayValue = number.value;
            currentOperand.textContent += calculator.displayValue;
            calculator.firstOperand = currentOperand.textContent; //store all consecutive digits in firstOperand
            console.log(calculator.firstOperand);
        }
    })
});

operatorButtons.forEach((operator) => {
operator.addEventListener('click', function() {
    if(calculator.firstOperand != null && calculator.chosenOperator === null && calculator.secondOperand === null) { 
        calculator.displayValue = operator.value; 
        currentOperand.textContent = calculator.displayValue;
        calculator.chosenOperator = operator.value; 
        lastOperand.textContent += calculator.firstOperand;
        console.log(calculator.chosenOperator);
    } else if(calculator.firstOperand != null && calculator.chosenOperator != null && calculator.secondOperand != null) {
        calculator.displayValue = operate(calculator.chosenOperator, calculator.firstOperand, calculator.secondOperand);
        calculator.chosenOperator = operator.value;
        lastOperand.textContent = calculator.displayValue;
        currentOperand.textContent = calculator.chosenOperator;
        calculator.firstOperand = calculator.displayValue;
        calculator.secondOperand = null;
    } else {
        return null;
    }
})
});

function evaluate() {
    calculator.displayValue = operate(calculator.chosenOperator, calculator.firstOperand, calculator.secondOperand);
    lastOperand.textContent += calculator.secondOperand;
    currentOperand.textContent = calculator.displayValue;
    calculator.firstOperand = currentOperand.textContent;
    calculator.chosenOperator = null;
    calculator.secondOperand = null;
    if(calculator.firstOperand != null && calculator.chosenOperator === null) {
        currentOperand.textContent = calculator.displayValue
        lastOperand.textContent = calculator.chosenOperator;
    } else {
        return null;
    }
}


function decimal() {
        if(calculator.firstOperand === null) {
            return alert("Error");
        } else if(!calculator.firstOperand.includes('.') && calculator.chosenOperator === null) {
            calculator.displayValue = decimalButton.value;
            currentOperand.textContent += calculator.displayValue;
            calculator.firstOperand = calculator.displayValue;
        } else if(!calculator.secondOperand.includes('.') && calculator.chosenOperator != null && calculator.firstOperand != null) {
            calculator.displayValue = decimalButton.value;
            currentOperand.textContent += calculator.displayValue;
            calculator.secondOperand += calculator.displayValue;
        } else if(calculator.firstOperand.includes('.') && calculator.secondOperand.includes('.')) {
            return alert("Error");
        } else {
            return;
        }
}

function negativeSign() {
        if(calculator.firstOperand === null) {
            calculator.displayValue = negativeButton.value;
            currentOperand.textContent = calculator.displayValue;
            calculator.firstOperand = calculator.displayValue;
        } else if(calculator.secondOperand === null) {
            calculator.displayValue = negativeButton.value;
            currentOperand.textContent += calculator.displayValue;
            calculator.secondOperand = calculator.displayValue;
        } else {
            return null;
        }
    }

function clearMemory() {
        if(currentOperand.textContent != "0") {
            calculator.displayValue = 0;
            calculator.firstOperand = null;
            calculator.secondOperand = null;
            calculator.chosenOperator = null;
            currentOperand.textContent = calculator.displayValue;
            lastOperand.textContent = '';
        } else {
            return;
        }
};

function add(a, b) {
    return (a + b).toFixed(1);
};

function subtract(a, b) {
    return (a - b).toFixed(1);
};

function multiply(a, b) {
    return (a * b).toFixed(1);
};

function divide(a, b) {
    return (a / b).toFixed(7);
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
            if(b === 0) return displayScreen.textContent = "That's illegal";
            else return divide(a, b);
        case '%':
            return percent(a);
        default:
            return null;
    }
};



