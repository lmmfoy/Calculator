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
});

let num1 = 0;


let operator;

function addOperator(oper) {
    display.textContent += oper;
    num1 = parseFloat(displayValue);
    operator = oper;
    displayValue = "";
}

document.addEventListener("click", event => {

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
            display.textContent += "=";
            let equaled = operate(operator, num1, parseInt(displayValue));
            display.textContent += equaled;
            displayValue = equaled;
            operationComplete = true;
            break;
    }
});

document.addEventListener("click", event => {
    if (operationComplete == true) {
        display.textContent = displayValue;
        if (event.target.classList.contains("number")) {
            displayValue = "";
            operationComplete = false;
            display.textContent = "";
        } else if (event.target.classList.contains("operator")) {
            operationComplete = false;
        }
    }
});