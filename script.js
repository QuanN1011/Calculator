let num1 = null;
let num2 = null;
let operator = null;
let justCalculated = false;


// four basic operations
function add (a, b) {
    return a + b;
}
function subtract (a, b) {
    return a - b;
}
function multiply (a, b) {
    return a * b;
}
function divide (a, b) {
    if (b === 0) {
        throw new Error("Division by zero is not allowed.");
    }
    return a / b;
}
function modulus(a, b){
    return a % b;
}

// function to call correct operation
function operate(a, b, op) {
    switch (op) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        case '%':
            return modulus(a, b);
        default:
            throw new Error("Invalid operator");
    }
}
// get display and the digits buttons
const display = document.querySelector(".display"); // get display
const digitButtons = document.querySelectorAll(".digit"); // get digit buttons
let currentInput = "";

// function to update display when user click on digits
function updateDisplay(digit){
    if(justCalculated){
        currentInput = digit;
        justCalculated = false;
    }
    else{
        currentInput += digit;
    }
    display.textContent = currentInput;
}

// add event listener to get digit
digitButtons.forEach(button => {
    button.addEventListener("click", () =>{
        updateDisplay(button.textContent);
        console.log(currentInput);
    });
});

// get the operator buttons
const operatorButtons = document.querySelectorAll(".operator");

// event listener to get the operator, ensuring that calculator should not evaluate more than a single pair of numbers at a single time
// 12 + 7 - 1 = 12 + 7 = 19 - 1 = 18
operatorButtons.forEach(button => {
    button.addEventListener("click", () =>{
        if (operator === '/' && parseFloat(currentInput) === 0){ // if trying to divide by 0
            display.textContent = "Can't divide by 0";
            num1 = null;
            num2 = null;
            operator = null;
            currentInput = "";
            return;
        }
        // if user press operator twice, current input is "" just get the operator and do nothing
        if (currentInput === ""){
            operator = button.textContent;
            return;
        }
        if (operator !== null){
            num2 = parseFloat(currentInput);
            let result = operate(num1, num2, operator);
            if(!(Number.isInteger(result))){        // round decimals if neccesary
                result = result.toFixed(5);
            }
            result = parseFloat(result);
            display.textContent = result;
            num1 = result;
            justCalculated = true;
            operator = button.textContent;
            currentInput = "";
        }
        else{
            num1 = parseFloat(currentInput);
            operator = button.textContent;
            currentInput = "";
            console.log(button.textContent);
        }
    })
});

// get equal and clear buttons
const equalButton = document.getElementById('equal');
const clearButton = document.getElementById('clear');

equalButton.addEventListener("click", () => {
    if(num1 === null || operator === null || currentInput === null){ // check if it's valid to click =
        return;
    }
    if (operator === '/' && parseFloat(currentInput) === 0){ // if trying to divide by 0
        display.textContent = "Can't divide by 0";
        num1 = null;
        num2 = null;
        operator = null;
        currentInput = "";
        return;
    }
    num2 = parseFloat(currentInput);
    let result = operate(num1, num2, operator);
    if(!(Number.isInteger(result))){        // round decimals if neccesary
                result = result.toFixed(5);
    }
    result = parseFloat(result);
    display.textContent = result;
    currentInput = result;
    justCalculated = true;
    num1 = result;
    num2 = null;
    operator = null;
})

clearButton.addEventListener("click", () => {
    num1 = null;
    num2 = null;
    operator = null;
    currentInput = "";
    display.textContent = "";
})

// added backspace button to delete
const backspaceButton = document.getElementById('backspace');

backspaceButton.addEventListener("click", () => {
    currentInput = currentInput.slice(0, -1); // -1 = string.length -1
    display.textContent = currentInput;
})

// add button to switch between signs
const signButton = document.getElementById('sign');

signButton.addEventListener("click", () => {
    if(currentInput.startsWith('-')){
        currentInput = currentInput.slice(1);
    }
    else{
        currentInput = '-' + currentInput;
    }
    display.textContent = currentInput;
})

// add button for decimal
const decimalButton = document.getElementById('decimal');
decimalButton.addEventListener("click", () =>{
    if (currentInput.includes('.')){
        return;
    }
    // if empty
    if (currentInput === ""){
        currentInput = "0.";
    }
    else{
        currentInput += ".";
    }
    display.textContent = currentInput;
})
