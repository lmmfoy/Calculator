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
    return Math.round(answer * 10000) / 10000; // Rounding decimals
}

function addOperator(oper) {
    num1 = parseFloat(tempValue);
    tempValue = "";
}

function operationOngoing (){
    if (display.textContent.includes("=")) {
        return "reset display";
    } else if (display.textContent.includes("+") | display.textContent.includes("-") | display.textContent.includes("*") | display.textContent.includes("/")) {
        return true;
    }
}

function equaling(value) {
    let equaled = operate(operator, num1, parseInt(tempValue)); // perform the math operation 
    if (equaled === false) {
        clearAll();
        display.textContent = "No! Try again."
        return;
    }
    if (value === "=") {
        display.textContent += "=";   
        display.textContent += equaled;
        tempValue = equaled; // save "equaled" in the tempValue in case the user wants to perform more operations on it
        operationComplete = true;
    } else {
        display.textContent = equaled;
        tempValue = "";
        num1 = equaled;
    }
}


function clearAll() {
    tempValue = "";
    num1 = null;
    operator = "";
    operationComplete = false;
    display.textContent = "";
}

const display = document.querySelector("p");
const clear = document.getElementById("clear");
const backspace = document.getElementById("backspace");

let tempValue = "";
let num1 = null;
let operator = "";
let operationComplete = false;


document.addEventListener("click", event => { 
    let value = event.target.value;
    if (event.target.classList.contains("number")) {
        if (operationComplete === true) { // Checking to see if there was a previous operation, in which case start fresh
             tempValue = value;
             operationComplete = false;
        } else {
            tempValue += value;
        }
        if (operationOngoing() === true) {
            let a = display.textContent;
            if (/\D[0-9]*\b/.test(a)) {
                display.textContent = num1 + operator + tempValue;
            } else {
                display.textContent += tempValue;
            }
        } else {
            display.textContent = tempValue;
        }
    } else if ((event.target.classList.contains("operator")) && (tempValue != "")) {
        let inputOperator = value;
        if (operationOngoing() === true) {
            equaling(value); 
            
        } else if (operationOngoing() === "reset display") {
            display.textContent = tempValue;
            addOperator(inputOperator);
        } else {
            addOperator(inputOperator);
        }
        display.textContent += inputOperator; // Add operator to display and set "operator"
        operator = inputOperator; 
        
    } else if (value === "=" && operationOngoing() === true) {
        equaling(value);     
    }
})


// clear everything
clear.addEventListener("click", () => clearAll());

// todo
backspace.addEventListener("click", function() {

})




