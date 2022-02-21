function operate(operator, num1, num2) {
    let answer;

    if (operator === "+") {
       answer = num1 + num2;

    } else if (operator === "-") {
        answer = num1 - num2;

    } else if (operator === "*") {
        answer = num1 * num2;

    } else if (operator === "/") {
        if (num2 === 0) { // Don't let user divide by 0
            return false;
        }
        answer = num1 / num2;
    }

    return Math.round(answer * 10000000000) / 10000000000; // Rounding decimals
}

function addOperator(oper) {
    num1 = parseFloat(bottomValue);
    bottomValue = "";
}

function operationOngoing() {
    
    if (displayTop.textContent.includes("=")) {
        return "reset display";

    } else if (displayTop.textContent.includes("+") | displayTop.textContent.includes("-") | displayTop.textContent.includes("*") | displayTop.textContent.includes("/")) {
        return true;
    }
}

function equaling(value) {
    
    num2 = parseFloat(bottomValue);

    if (isNaN(num2)) {
        return;
    }

    let equaled = operate(operator, num1, num2); // perform the math operation 

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

function backSpace() {
    if (operationComplete === true) { // Don't backspace on a previous answer
        return;

    } else if (operatorLast === true) {
        displayTop.textContent = displayTop.textContent.slice(0, -1);
        bottomValue = num1;
        operatorLast = false;
    
    } else {
        displayBottom.textContent = displayBottom.textContent.slice(0, -1);
        bottomValue = bottomValue.slice(0, -1);
    }
};


function dataEntry(value) {

    if (numbers.includes(value)) {
        //  if (displayBottom.textContent.length >= 15) {
        //     return;
        //  }

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
        
    } else if ((operators.includes(value)) && (bottomValue === 0 || bottomValue !== "")) {

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
        
    } else if ((value === "=" || value === "Enter") && operationOngoing() === true) {
        if (value === "Enter") {
            value = "=";
        }
        equaling(value);   
        operatorLast = false;
    }
};


const displayTop = document.getElementById("display-top");
const displayBottom = document.getElementById("display-bottom");
const clear = document.getElementById("clear");
const backspace = document.getElementById("backspace");

let bottomValue = "";
let num1 = null;
let operator = "";
let operationComplete = false;
let operatorLast = false;
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const operators = ["+", "-", "*", "/"];

document.addEventListener("click", event => dataEntry(event.target.value));

document.addEventListener("keydown", event => dataEntry(event.key));

document.addEventListener("keydown", event => console.log("key: " + event.key))

// clear everything
clear.addEventListener("click", () => clearAll());

// clear last number/operator entered if backspace hit
backspace.addEventListener("click", () => backSpace());

document.addEventListener("keydown", event => {
    if (event.key === "Backspace") {
        backSpace();
    } 
});

