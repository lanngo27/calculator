let firstOperand = '';
let secondOperand = '';
let operator = null;
let clearScreen = false;
let resetDisplay = false;
let lastClick = "";

const divideOperator = '÷';
const multiplyOperator = '×';
const plusOperator = '+';
const minusOperator = '-';
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator')
const decimalBtn = document.getElementById('decimalBtn');
const deleteBtn = document.querySelector('.deleteBtn');
const clearBtn = document.querySelector('.clearBtn');
const display = document.querySelector('.display');

numberBtns.forEach(number => number.addEventListener('click'
    , () => processNumber(number.textContent)));
operatorBtns.forEach(operator => operator.addEventListener('click'
    , () => processOperator(operator.textContent)));
deleteBtn.addEventListener('click', processDelete);
clearBtn.addEventListener('click', resetCalculator);
window.addEventListener('keydown', handleKeyboardInput);

function processDelete() {
    if (display.textContent !== '0')
        display.textContent = display.textContent.toString().slice(0, -1);
}

function resetCalculator(e) {
    display.textContent = '0';
    firstOperand = '';
    secondOperand = '';
    operator = null;
    clearScreen = false;
    resetDisplay = false;
}

function processNumber(number) {
    lastClick = 'number';
    if (display.textContent.includes('.') && number === '.') 
        return;
    if (resetDisplay || display.textContent === '0') {
        display.textContent = number; 
        resetDisplay = false;
    } else
        display.textContent += number; 
}

function processOperator(newOperator) {
    resetDisplay = true;
    if (lastClick == "operator") {
        firstOperand = display.textContent;
        operator = newOperator;
        return;
    }
    
    if (operator !== null) evaluate();
    if (newOperator != "=") {
        firstOperand = display.textContent;
        operator = newOperator;
    }
    lastClick = 'operator';
}

function handleKeyboardInput(e) {
    if ((e.key >= 0 && e.key <= 9) || e.key == '.') processNumber(e.key);
    if (e.key == '=' || e.key === 'Enter') evaluate();
    if (e.key == 'Backspace') processDelete();
    if (e.key == 'Escape') resetDisplay();
    if (e.key == '+' || e.key === '-') processOperator(e.key);
    if (e.key == '*') processOperator(multiplyOperator);
    if (e.key == '/') processOperator(divideOperator);
}

function evaluate() {
    secondOperand = display.textContent;
    if (operator === divideOperator && secondOperand === '0')
    {
        display.textContent = `Can't divide by zero`;
        return;
    }
    display.textContent = roundResult(
        performOperation(operator, firstOperand, secondOperand)
    );
    operator = null;
}

function roundResult(number) {
    return Math.round(number * 10e5) / 10e5;
}

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function performOperation(operator, x, y) {
    switch(operator) {
        case plusOperator:
            return add(x, y);
        case minusOperator:
            return subtract(x, y);
        case multiplyOperator:
            return multiply(x, y); 
        case divideOperator:
            if (y === 0) return NaN;
            return divide(x, y);
        default:
            return null 
    }
}