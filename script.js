let num1 = null;
let num2 = null;
let operator = null;


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
    currentInput += digit;
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
        if (operator !== null && currentInput !== ""){
            num2 = parseFloat(currentInput);
            let result = operate(num1, num2, operator);
            if(!(Number.isInteger(result))){        // round decimals if neccesary
                result = result.toFixed(5);
            }
            result = parseFloat(result);
            display.textContent = result;
            num1 = result;
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
    if(num1 === null || operator === null || currentInput === null){
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
