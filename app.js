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
deleteButton.addEventListener('click', remove);
window.addEventListener('keypress', keyboardInput);

const calculator = {
    displayValue: '0', 
    firstOperand: null,
    secondOperand: null,
    chosenOperator: null,
}

function defaultDisplay() {
    currentOperand.textContent = calculator.displayValue;
    lastOperand.textContent = '';
}
defaultDisplay();

numberButtons.forEach((number) => {
    number.addEventListener('click', function() {
        if(currentOperand.textContent === '0') {
            currentOperand.textContent = number.value; 
            calculator.firstOperand =  currentOperand.textContent; //store first number in firstOperand 
            console.log(calculator.firstOperand);
        } else if(calculator.firstOperand != null && calculator.secondOperand === null && calculator.chosenOperator != null) {
            currentOperand.textContent = number.value;
            calculator.secondOperand = currentOperand.textContent; //if secondOperand is empty store the numbers in secondOperand
            lastOperand.textContent += calculator.chosenOperator;
            console.log(calculator.secondOperand);
        } else if(calculator.secondOperand != null && calculator.firstOperand != null && calculator.chosenOperator != null) {
            currentOperand.textContent += number.value;
            calculator.secondOperand = currentOperand.textContent; //store all consecutive numbers in secondOperand
            console.log(calculator.secondOperand);
        }
        else {
            currentOperand.textContent += number.value;
            calculator.firstOperand = currentOperand.textContent; //store all consecutive digits in firstOperand
            console.log(calculator.firstOperand);
        }
    })
});

operatorButtons.forEach((operator) => {
operator.addEventListener('click', function() {
    if(calculator.firstOperand != null && calculator.chosenOperator == null && calculator.secondOperand === null) { 
        currentOperand.textContent = operator.value;
        calculator.chosenOperator = currentOperand.textContent;
        lastOperand.textContent += calculator.firstOperand;
        console.log(calculator.chosenOperator);
    } else if(calculator.firstOperand != null && calculator.chosenOperator != null && calculator.secondOperand != null) {
        currentOperand.textContent = operate(calculator.chosenOperator, calculator.firstOperand, calculator.secondOperand);
        calculator.chosenOperator = operator.value;
        lastOperand.textContent = currentOperand.textContent;
        currentOperand.textContent = calculator.chosenOperator;
        calculator.firstOperand = lastOperand.textContent;
        calculator.secondOperand = null;
    } else if(currentOperand.textContent == '') {
        currentOperand.textContent = operator.value;
        calculator.chosenOperator = currentOperand.textContent;
        lastOperand.textContent = calculator.firstOperand;
        console.log(calculator.chosenOperator);
    } else {
        return null;
    }
})
});

function remove() {
    if(calculator.firstOperand !== '' && (calculator.chosenOperator == null || calculator.chosenOperator == '') && (calculator.secondOperand == null || calculator.secondOperand == '')) {
        currentOperand.textContent = currentOperand.textContent.substring(0, currentOperand.textContent.length - 1);
        calculator.firstOperand = currentOperand.textContent;
        console.log(calculator.firstOperand);
    } else if((calculator.firstOperand !== null || calculator.firstOperand !== '') && (calculator.chosenOperator !== null || calculator.chosenOperator !== '') && (calculator.secondOperand == null || calculator.secondOperand == '')) {
        currentOperand.textContent = currentOperand.textContent.substring(0, currentOperand.textContent.length - 1);
        calculator.chosenOperator = currentOperand.textContent;
        console.log(calculator.chosenOperator);
    } else if((calculator.firstOperand !== null || calculator.firstOperand !== '') && (calculator.chosenOperator !== null || calculator.chosenOperator !== '') && (calculator.secondOperand !== null || calculator.secondOperand !== '')) {
        currentOperand.textContent = currentOperand.textContent.substring(0, currentOperand.textContent.length - 1);
        calculator.secondOperand = currentOperand.textContent;
        console.log(calculator.secondOperand);
    }
    else return null;
};

function evaluate() {
    if(calculator.firstOperand !== null && calculator.chosenOperator !== null && calculator.secondOperand !== null) {
        calculator.displayValue = operate(calculator.chosenOperator, calculator.firstOperand, calculator.secondOperand);
        lastOperand.textContent += calculator.secondOperand;
        currentOperand.textContent = calculator.displayValue;
        calculator.firstOperand = currentOperand.textContent;
        calculator.chosenOperator = null;
        calculator.secondOperand = null;
    if(calculator.firstOperand != null && calculator.chosenOperator === null) {
        currentOperand.textContent = calculator.firstOperand;
        lastOperand.textContent = calculator.chosenOperator;
    } else {
        return null;
    }
} else {
        currentOperand.textContent = calculator.displayValue;
}
};

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
        if(currentOperand.textContent != "0" || currentOperand.textContent != null) {
            calculator.firstOperand = null;
            calculator.secondOperand = null;
            calculator.chosenOperator = null;
            currentOperand.textContent = '0';
            lastOperand.textContent = '';
        } else {
            return;
        }
};

function keyboardInput(e) {
    if(currentOperand.textContent === '0') {
        if(e.key == '.') {
            return alert('Error');
        } else {
                    currentOperand.textContent = e.key; 
                    calculator.firstOperand = currentOperand.textContent; 
                    console.log(calculator.firstOperand);
                }
            }
    else if(e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') { 
        currentOperand.textContent = e.key; 
        calculator.chosenOperator = currentOperand.textContent; 
        lastOperand.textContent = calculator.firstOperand; 
        console.log(calculator.chosenOperator);
    } else if(calculator.firstOperand != null && calculator.secondOperand === null && calculator.chosenOperator != null) {
            currentOperand.textContent = e.key;
            calculator.secondOperand = currentOperand.textContent; 
            lastOperand.textContent += calculator.chosenOperator; 
            console.log(calculator.secondOperand);
    } else if(calculator.secondOperand != null && calculator.firstOperand != null && calculator.chosenOperator != null) { 
            if(e.key == '=' || e.key == 'Enter') { 
            calculator.displayValue = operate(calculator.chosenOperator, calculator.firstOperand, calculator.secondOperand); 
            lastOperand.textContent += calculator.secondOperand; 
            currentOperand.textContent = calculator.displayValue; 
            calculator.firstOperand = currentOperand.textContent; 
            calculator.chosenOperator = null;
            calculator.secondOperand = null;
            } else if(!calculator.secondOperand.includes('.')) { 
                    currentOperand.textContent += e.key;
                    calculator.secondOperand = currentOperand.textContent;
                    lastOperand.textContent = calculator.firstOperand + calculator.chosenOperator;
                    console.log(calculator.secondOperand);
                } else if(calculator.secondOperand.includes('.') && e.key == '.') {
                    return alert('Error');
                } else if(calculator.secondOperand.includes('.')) {
                    currentOperand.textContent += e.key;
                    calculator.secondOperand = currentOperand.textContent; 
                    lastOperand.textContent = calculator.firstOperand + calculator.chosenOperator;
                    console.log(calculator.secondOperand);
                }
            }
    else if(e.key == 'Delete' || e.key == 'Backspace') {
        if(calculator.firstOperand !== '' && (calculator.chosenOperator == null || calculator.chosenOperator == '') && (calculator.secondOperand == null || calculator.secondOperand == '')) {
            currentOperand.textContent = currentOperand.textContent.substring(0, currentOperand.textContent.length - 1);
            calculator.firstOperand = currentOperand.textContent;
            console.log(calculator.firstOperand);
        } else if((calculator.firstOperand !== null || calculator.firstOperand !== '') && (calculator.chosenOperator !== null || calculator.chosenOperator !== '') && (calculator.secondOperand == null || calculator.secondOperand == '')) {
            currentOperand.textContent = currentOperand.textContent.substring(0, currentOperand.textContent.length - 1);
            calculator.chosenOperator = currentOperand.textContent;
            console.log(calculator.chosenOperator);
        } else if((calculator.firstOperand !== null || calculator.firstOperand !== '') && (calculator.chosenOperator !== null || calculator.chosenOperator !== '') && (calculator.secondOperand !== null || calculator.secondOperand !== '')) {
            currentOperand.textContent = currentOperand.textContent.substring(0, currentOperand.textContent.length - 1);
            calculator.secondOperand = currentOperand.textContent;
            console.log(calculator.secondOperand);
        }
        else return null;
    }
    else {
        if(!calculator.firstOperand.includes('.')) { 
            currentOperand.textContent += e.key;
            calculator.firstOperand = currentOperand.textContent; 
            console.log(calculator.firstOperand); 
        } else if(calculator.firstOperand.includes('.') && e.key == '.') { 
            return alert('Error');
        } else if(calculator.firstOperand.includes('.')) { 
            currentOperand.textContent += e.key;
            calculator.firstOperand = currentOperand.textContent; 
            console.log(calculator.firstOperand); 
        }
        else {
            return null;
        }
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
    return (a / b).toFixed(2);
};

function percent(a) {
    return (a / 100).toFixed(2);
};

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
        case '*':
            return multiply(a, b);
        case '÷':
            if(b === 0) return currentOperand.textContent = "That's illegal";
            else return divide(a, b);
        case '/':
            if(b === 0) return currentOperand.textContent = "That's illegal";
            else return divide(a, b);
        case '%':
            return percent(a);
        default:
            return null;
    }
};
