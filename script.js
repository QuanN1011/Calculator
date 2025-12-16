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

// event listener to get the operator
operatorButtons.forEach(button => {
    button.addEventListener("click", () =>{
        num1 = parseInt(currentInput);
        operator = button.textContent;
        currentInput = "";
        display.textContent = `${num1} ${operator}`;
        console.log(button.textContent);
    })
})
