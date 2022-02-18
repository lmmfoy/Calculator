// Math functions:
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
    if (operator === "+") {
       return add(num1, num2);
    } else if (operator === "-") {
        return subtract(num1, num2);
    } else if (operator === "*") {
        return multiply(num1, num2);
    } else if (operator === "/") {
        return divide(num1, num2);
    }
}

// If a number entered, add to display
function enterNumber(event) {
    switch(event.target) {
        case zero:
            display.textContent += "0";
            displayValue += "0";
            break;
        case one:
            display.textContent += "1";
            displayValue += "1";
            break;
        case two:
            display.textContent += "2";
            displayValue += "2";
            break;
        case three:
            display.textContent += "3";
            displayValue += "3";
            break;
        case four:
            display.textContent += "4";
            displayValue += "4";
            break;
        case five:
            display.textContent += "5";
            displayValue += "5";
            break;
        case six:
            display.textContent += "6";
            displayValue += "6";
            break;
        case seven:
            display.textContent += "7";
            displayValue += "7";
            break;
        case eight:
            display.textContent += "8";
            displayValue += "8";
            break;
        case nine:
            display.textContent += "9";
            displayValue += "9";
            break;
    }
};



/* If operator entered, run "addOperator" function to display operator, 
 save first number in "num1" variable to make room for second number in "displayValue",
 and save operator in "operator"
*/

function enterOperator(event) {
    switch(event.target) {
        case addition:
            addOperator("+")
            break;
        case subtraction:
            addOperator("-")
            break;
        case multiplication:
            addOperator("*")
            break;
        case division:
            addOperator("/")
            break;
        case equals:
            equaling(); 
            break;
    }
}

let num1 = 0;
let operator;

/* display operator, 
save first number in "num1" variable to make room for second number in "displayValue",
and save operator in "operator"
*/

function addOperator(oper) {
    if (display.textContent.includes("+") | display.textContent.includes("-") | display.textContent.includes("*") | display.textContent.includes("/")) {
        equaling(); // If an operator is already in play, finish that equation before starting another      
    } else {
        num1 = parseFloat(displayValue); 
        displayValue = ""; // Reset displayValue
    }
    display.textContent += oper; // Add operator to display and set "operator"
    operator = oper; 
}

function equaling() {
    display.textContent += "=";
    let equaled = operate(operator, num1, parseInt(displayValue)); // perform the math operation 
    display.textContent += equaled;
    displayValue = equaled; // save "equaled" in the displayValue in case the user wants to perform more operations on it
    operationComplete = true;
}
    




const display = document.querySelector("p");

const zero = document.querySelector("#zero");
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");
const four = document.querySelector("#four");
const five = document.querySelector("#five");
const six = document.querySelector("#six");
const seven = document.querySelector("#seven");
const eight = document.querySelector("#eight");
const nine = document.querySelector("#nine");
const decimal = document.querySelector("#decimal");
const addition = document.querySelector("#add");
const subtraction = document.querySelector("#subtract");
const multiplication = document.querySelector("#multiply");
const division = document.querySelector("#divide");

let displayValue = "";
let operationComplete;


document.addEventListener("click", event => {
    if (operationComplete == true) { // If "equals" has just been pressed
        display.textContent = displayValue; 
        if (event.target.classList.contains("number")) {
            operationComplete = false; // reset
            displayValue = ""; // reset the displayValue
            display.textContent = "";
            enterNumber(event); // begin again with number entry
        } else if (event.target.classList.contains("operator")) {
            operationComplete = false; 
            display.textContent = displayValue; 
            enterOperator(event);
        }
    }
});



// If a number entered, add to display and to "displayValue"
document.addEventListener("click", event => {
    if (event.target.classList.contains("number")) {
        enterNumber(event);
        
    } else if (event.target.classList.contains("operator")) {
        enterOperator(event); 
    }
});



