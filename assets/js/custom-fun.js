"use strict";

let allButtons = document.querySelectorAll("button");
for (let button of allButtons) {
    button.addEventListener("mousedown", (event) => {
        event.target.classList.add("active");
    });

    button.addEventListener("mouseup", (event) => {
        event.target.classList.remove("active");
    });
}

let allNumbers = document.querySelectorAll(".number");
let allOperators = document.querySelectorAll(".operator");
let displayValue = [];
let operationValue = [];

// Number Handle;
for (let number of allNumbers) {
    number.addEventListener("click", (event) => {
        if (event.target.classList.contains("point")) {
            checkEmptyValue("0");
            if (displayValue[displayValue.length - 1].indexOf(".") < 0) {
                setNumberToFinalArray();
            }
        } else {
            checkEmptyValue();
            setNumberToFinalArray();
        }
        display();
    });
}

function setNumberToFinalArray() {
    let checkDisplayValue = displayValue[displayValue.length - 1].match(/[0-9\.]/g);
    if (!checkDisplayValue) {
        displayValue.push(event.target.innerText);
        operationValue.push(event.target.getAttribute("data-value"));
    } else {
        displayValue[displayValue.length - 1] += event.target.getAttribute("data-value");
        operationValue[operationValue.length - 1] += event.target.getAttribute("data-value");
    }
}

// Operator Handler;
for (let operator of allOperators) {
    operator.addEventListener("click", (event) => {
        if (displayValue.length === 0) {
            checkEmptyValue("0");
        }
        let checkOperationValue = operationValue[operationValue.length - 1].match(/[\+\-\*\/]/g);
        if (!checkOperationValue) {
            displayValue.push(event.target.innerText);
            operationValue.push(event.target.getAttribute("data-value"));
        } else {
            displayValue[displayValue.length - 1] = event.target.innerText;
            operationValue[operationValue.length - 1] = event.target.getAttribute("data-value");
        }
        display();
    });
}

// Back character;
document.querySelector(".back").addEventListener("click", () => {
    if (displayValue.length >= 1) {
        displayValue[displayValue.length - 1] = displayValue[displayValue.length - 1].slice(0, -1);
        operationValue[operationValue.length - 1] = operationValue[operationValue.length - 1].slice(0, -1);
    }

    if (displayValue[displayValue.length - 1] === "") {
        displayValue = displayValue.slice(0, -1);
        operationValue = operationValue.slice(0, -1);
    }

    if (displayValue.length === 0) {
        displayArea.innerHTML = "0";
    }

    display();
});

// Percentage handler;
let percentButton = document.querySelector(".percent");
percentButton.addEventListener("click", () => {
    Percentage();
});

function Percentage() {
    let validationCheck = displayValue.length % 2 === 0 && displayValue.length !== 0;
    if (validationCheck) {
        if (displayValue.length === 2) {
            displayValue[1] = String(displayValue[1] / 100);
            operationValue[1] = String(operationValue[1] / 100);
        } else {
            displayValue[displayValue.length - 1] = String(((displayValue[displayValue.length - 3] / 100) * displayValue[displayValue.length - 1]).toFixed(2));
            operationValue[operationValue.length - 1] = String((operationValue[operationValue.length - 3] / 100) * operationValue[operationValue.length - 1]);
        }
    }
    display();
}

// Empty value handler in final array;
function checkEmptyValue(value = "") {
    if (displayValue.length === 0) {
        displayValue.push(value);
    }
    if (operationValue.length === 0) {
        operationValue.push(value);
    }
}

// Total handler;
document.querySelector(".equal").addEventListener("click", () => {
    checkEmptyValue();
    let getLastOperationData = operationValue[operationValue.length - 1].match(/[\+\-\*\/]/g);
    let calculateData;
    if (!getLastOperationData) {
        calculateData = operationValue.join("");
    } else {
        calculateData = operationValue.slice(0, -1).join("");
    }
    calculateData = eval(calculateData);
    clear();
    displayValue.push(calculateData ? String(calculateData) : "");
    operationValue.push(calculateData ? String(calculateData) : "");
    displayArea.innerHTML = calculateData;
    display();
});

// Display output handler;
let displayArea = document.querySelector(".display");
function display() {
    let finalDisplay = displayValue.join("");
    if (finalDisplay === "") {
        displayArea.innerHTML = "0";
    } else {
        displayArea.innerHTML = finalDisplay
    }
}

// Clear data handler;
document.querySelector(".clear").addEventListener("click", () => {
    clear();
});

function clear() {
    displayValue = [];
    operationValue = [];
    displayArea.innerHTML = "0";
}
