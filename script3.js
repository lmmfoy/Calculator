function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, num1, num2) {
    let answer;
    if (num2 === undefined) {
        return false;
    }
    if (operator === "+") {
       answer = add(num1, num2);
    } else if (operator === "-") {
        answer = subtract(num1, num2);
    } else if (operator === "*") {
        answer = multiply(num1, num2);
    } else if (operator === "/") {
        if (num2 === 0) {
            return false;
        }
        answer = divide(num1, num2);
    }
    return Math.round(answer * 10000000000) / 10000000000; // Rounding decimals
}

function addOperator(oper) {
    num1 = parseFloat(bottomValue);
    bottomValue = "";
}

function operationOngoing (){
    
    if (displayTop.textContent.includes("=")) {
        return "reset display";

    } else if (displayTop.textContent.includes("+") | displayTop.textContent.includes("-") | displayTop.textContent.includes("*") | displayTop.textContent.includes("/")) {
        return true;
    }
}

function equaling(value) {

    let equaled = operate(operator, num1, parseFloat(bottomValue)); // perform the math operation 
    
    if (equaled === false) {
        clearAll();
        displayTop.textContent = "No! Try again."
        return;
    }

    if (value === "=") {
        displayTop.textContent += bottomValue + "=";   
        displayBottom.textContent = equaled;
        bottomValue = equaled; // save "equaled" in the bottomValue in case the user wants to perform more operations on it
        operationComplete = true;

    } else {
        displayTop.textContent = equaled;
        displayBottom.textContent = equaled;
        bottomValue = "";
        num1 = equaled;
    }
}


function clearAll() {
    bottomValue = "";
    num1 = null;
    operator = "";
    operationComplete = false;
    displayTop.textContent = "";
    displayBottom.textContent = "";
}

const displayTop = document.getElementById("display-top");
const displayBottom = document.getElementById("display-bottom");
const clear = document.getElementById("clear");
const backspace = document.getElementById("backspace");

let bottomValue = "";
let num1 = null;
let operator = "";
let operationComplete = false;
let operatorLast = false;

document.addEventListener("click", event => { 

    let value = event.target.value;

    if (event.target.classList.contains("number")) {

        if (operationComplete === true) { // Checking to see if there was a previous operation, in which case start fresh
             bottomValue = value;
             operationComplete = false;

        } else if (value === "." && displayBottom.textContent.includes(".")) { // Only one decimal allowed per number
            return;

        } else {
            bottomValue += value;
        }

        displayBottom.textContent = bottomValue;
        operatorLast = false;
        
    } else if ((event.target.classList.contains("operator")) && (bottomValue != "")) {

        let inputOperator = value;
        
        if (operationOngoing() === true) {
            equaling(value); 

        } else if (operationOngoing() === "reset display") {
            displayTop.textContent = bottomValue;
            addOperator(inputOperator);

        } else {
            addOperator(inputOperator);
        }

        displayTop.textContent = num1 + inputOperator; // Add operator to display and set "operator"
        operator = inputOperator; 

        operatorLast = true;
        
    } else if (value === "=" && operationOngoing() === true) {
        equaling(value);   
        operatorLast = false;
    }

    if (/[\+\-\*\/]=/.test(displayTop.textContent)) { // If user hits "=" immediately after an operator, the display won't change and further operations will still be possible
        displayTop.textContent = displayTop.textContent.slice(0, -1);
        displayBottom.textContent = num1;
    }
})


// clear everything
clear.addEventListener("click", () => clearAll());

// clear last number/operator entered
backspace.addEventListener("click", function() {
    if (operatorLast === true) {
        displayTop.textContent = displayTop.textContent.slice(0, -1);
        bottomValue = num1;
        operatorLast = false;
    
    } else {
        displayBottom.textContent = displayBottom.textContent.slice(0, -1);
        bottomValue = bottomValue.slice(0, -1);
    }
});

