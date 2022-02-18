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

backspace.addEventListener("click", function() {

})







// function enterNumber(event) {
//     switch(event.target) {
//         case zero:
//             return "0";
//         case one:
//             return "1";
//         case two:
//             return "2";
//         case three:
//             return "3";
//         case four:
//             return "4";
//         case five:
//             return "5";
//         case six:
//             return "6";
//         case seven:
//             return "7";
//         case eight:
//             return "8";
//         case nine:
//             return "9";
//     }
// }

// function enterOperator(event) {
//     switch(event.target) {
//         case addition:
//             addOperator("+")
//             break;
//         case subtraction:
//             addOperator("-")
//             break;
//         case multiplication:
//             addOperator("*")
//             break;
//         case division:
//             addOperator("/")
//             break;
//         case equals:
//             equaling(); 
//             break;
//     }
// }


// function addOperator(oper) {
//     if (display.textContent.includes("+") | display.textContent.includes("-") | display.textContent.includes("*") | display.textContent.includes("/")) {
//         equaling(); // If an operator is already in play, finish that equation before starting another      
//     } else {
//         num1 = parseFloat(displayValue); 
//         displayValue = ""; // Reset displayValue
//     }
//     display.textContent += oper; // Add operator to display and set "operator"
//     operator = oper; 
// }

// function addOperator(oper) {
//     return parseFloat(displayValue)
// }