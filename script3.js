const displayTop = document.getElementById("display-top");
const displayBottom = document.getElementById("display-bottom");
const clear = document.getElementById("clear");
const backspace = document.getElementById("backspace");

const calculator = {
    numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."],
    operators: ["+", "-", "*", "/"],
    operator: "",
    num1: null,
    bottomValue: "",
    operatorLast: false,
};


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
    calculator.num1 = parseFloat(calculator.bottomValue);
    calculator.bottomValue = "";
}


function operationOngoing() {
    if (!operationComplete() && (displayTop.textContent.includes("+") || displayTop.textContent.includes("-") || displayTop.textContent.includes("*") || displayTop.textContent.includes("/"))) {
        return true;
    }
}


function operationComplete() {
    if (displayTop.textContent.includes("=")) {
        return true;
    }
}


function equaling(value) {
    num2 = parseFloat(calculator.bottomValue);

    if (isNaN(num2)) {
        return;
    }

    let equaled = operate(calculator.operator, calculator.num1, num2); // perform the math operation 

    if (equaled === false) {
        clearAll();
        displayTop.textContent = "No! Try again."
        return;
    }

    if (value === "=") {
        displayTop.textContent += calculator.bottomValue + "=";   
        displayBottom.textContent = equaled;
        calculator.bottomValue = equaled; // save "equaled" in the calculator.bottomValue in case the user wants to perform more operations on it

    } else {
        displayTop.textContent = equaled;
        displayBottom.textContent = equaled;
        calculator.bottomValue = "";
        calculator.num1 = equaled;
    }
}


function clearAll() {
    calculator.bottomValue = "";
    calculator.num1 = null;
    calculator.operator = "";
    displayTop.textContent = "";
    displayBottom.textContent = "";
}


function backSpace() {
    if (operationComplete()) { // Don't backspace on a previous answer
        return;

    } else if (calculator.operatorLast === true) {
        displayTop.textContent = displayTop.textContent.slice(0, -1);
        calculator.bottomValue = calculator.num1;
        calculator.operatorLast = false;
    
    } else {
        displayBottom.textContent = displayBottom.textContent.slice(0, -1);
        calculator.bottomValue = calculator.bottomValue.slice(0, -1);
    }
}


function inputValueNumber(value) {
    if (value === "." && displayBottom.textContent.includes(".")) { // Only one decimal allowed per number
       return;
    }

   calculator.bottomValue += value; 
   displayBottom.textContent = calculator.bottomValue;
   calculator.operatorLast = false;
}


function inputValueOperator(value) {
    if (calculator.bottomValue === ""){ // Prevents 2 operators in a row being added, or an operator before an operand
        return;
    }

    let inputOperator = value;
    
    if (operationOngoing()) {
        equaling(value); 

    } else if (operationComplete()) {
        displayTop.textContent = calculator.bottomValue;
        addOperator(inputOperator);

    } else {
        addOperator(inputOperator);
    }

    displayTop.textContent = calculator.num1 + inputOperator; // Add operator to display and set "operator" 
    calculator.operator = inputOperator; 
    calculator.operatorLast = true;
}


function inputValueEqual(value) { 
    if ((operationOngoing() === false) || operationComplete()) { 
        return
    }

    if (value === "Enter") {
        value = "=";
    }

    equaling(value);   

    calculator.operatorLast = false;
}


function characterLimit() {
    if ((displayBottom.textContent.length >= 15) && (calculator.bottomValue !== "")) {
        return true;
    }
}


function dataEntry(value) {
    if (calculator.numbers.includes(value)) {

        if (characterLimit()) { // Don't allow number to overflow display
            return;
        }

        if (operationComplete()) { // Checking to see if there was a previous operation, in which case start fresh
            calculator.bottomValue = value;
            displayTop.textContent = "";
        }

        inputValueNumber(value);
        
    } else if (calculator.operators.includes(value)) {
        inputValueOperator(value);
             
    } else if (value === "=" || value === "Enter") {
        inputValueEqual(value);
    }
}


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

