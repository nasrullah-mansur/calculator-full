"use strict";


class Calculator {
    constructor() {
        this.allNumbers = document.querySelectorAll('.number');
        this.allOperators = document.querySelectorAll('.operator');
        this.displayArea = document.querySelector('.display');
        this.displayValue = [];
        this.operationValue = [];

        this.buttonStyleHandler();
        this.numberHandler();
        this.display();
        this.operatorHandler();
        this.backHandler();
        this.percentageHandler();
        this.totalHandler();
        this.clearHandler();
    }

    // Button Style;
    buttonStyleHandler() {
        let allButtons = document.querySelectorAll('button');
        for (let button of allButtons) {
            button.addEventListener('mousedown', (event) => {
                event.target.classList.add('active');
            })

            button.addEventListener('mouseup', (event) => {
                event.target.classList.remove('active');
            })
        }
    }

    // Number Handle;
    numberHandler() {
        for (let number of this.allNumbers) {
            number.addEventListener('click', event => {
                if (event.target.classList.contains('point')) {
                    checkEmptyValue('0');
                    if (displayValue[displayValue.length - 1].indexOf('.') < 0) {
                        this.setNumberToFinalArray(event)
                    }
                } else {
                    this.checkEmptyValue();
                    this.setNumberToFinalArray(event)
                }
                this.display();
            })
        }
    }

    setNumberToFinalArray(event) {
        let checkDisplayValue = this.displayValue[this.displayValue.length - 1].match(/[0-9\.]/g);
        if (!checkDisplayValue) {
            this.displayValue.push(event.target.innerText);
            this.operationValue.push(event.target.getAttribute('data-value'));
        } else {
            this.displayValue[this.displayValue.length - 1] += event.target.getAttribute('data-value');
            this.operationValue[this.operationValue.length - 1] += event.target.getAttribute('data-value');
        }
    }

    // Operator Handler;
    operatorHandler() {
        for (let operator of this.allOperators) {
            operator.addEventListener('click', event => {
                if (this.displayValue.length === 0) {
                    this.checkEmptyValue('0');
                }
                let checkOperationValue = this.operationValue[this.operationValue.length - 1].match(/[\+\-\*\/]/g);
                if (!checkOperationValue) {
                    this.displayValue.push(event.target.innerText);
                    this.operationValue.push(event.target.getAttribute('data-value'));
                } else {
                    this.displayValue[this.displayValue.length - 1] = event.target.innerText;
                    this.operationValue[this.operationValue.length - 1] = event.target.getAttribute('data-value');
                }
                this.display()
            })

        }
    }

    // Back character;
    backHandler() {
        document.querySelector('.back').addEventListener('click', () => {
            if (this.displayValue.length >= 1) {
                this.displayValue[this.displayValue.length - 1] = this.displayValue[this.displayValue.length - 1].slice(0, -1);
                this.operationValue[this.operationValue.length - 1] = this.operationValue[this.operationValue.length - 1].slice(0, -1);
            }
            if (this.displayValue[this.displayValue.length - 1] === '') {
                this.displayValue = this.displayValue.slice(0, -1);
                this.operationValue = this.operationValue.slice(0, -1);
            }
            if (this.displayValue.length === 0) {
                displayArea.innerHTML = '0';
            }
            this.display();
        })

    }

    // Percentage handler;
    percentageHandler() {
        let percentButton = document.querySelector('.percent');
        let calculatorDisplay = this.displayValue;
        let calculatorOperator = this.operationValue;
        percentButton.addEventListener('click', () => {
            Percentage();
            this.display();
        })

        function Percentage() {
            let validationCheck = (calculatorDisplay.length % 2) === 0 && calculatorDisplay.length !== 0;
            if (validationCheck) {
                if (calculatorDisplay.length === 2) {
                    calculatorDisplay[1] = String(calculatorDisplay[1] / 100);
                    calculatorOperator[1] = String(calculatorOperator[1] / 100);
                } else {
                    calculatorDisplay[calculatorDisplay.length - 1] = String(((calculatorDisplay[calculatorDisplay.length - 3] / 100) * (calculatorDisplay[calculatorDisplay.length - 1])).toFixed(2));
                    calculatorOperator[calculatorOperator.length - 1] = String((calculatorOperator[calculatorOperator.length - 3] / 100) * (calculatorOperator[calculatorOperator.length - 1]));;
                }
            }
        }
    }

    // Total handler;
    totalHandler() {
        document.querySelector('.equal').addEventListener('click', () => {
            this.checkEmptyValue();
            let getLastOperationData = this.operationValue[this.operationValue.length - 1].match(/[\+\-\*\/]/g);
            let calculateData;
            if (!getLastOperationData) {
                calculateData = this.operationValue.join('');
            } else {
                calculateData = (this.operationValue.slice(0, -1)).join('');
            }
            calculateData = eval(calculateData);
            this.clear();
            this.displayValue.push(calculateData ? String(calculateData) : '');
            this.operationValue.push(calculateData ? String(calculateData) : '');
            this.displayArea.innerHTML = calculateData;
            this.display();
        })
    }

    // Empty value handler in final array;
    checkEmptyValue(value = '') {
        if (this.displayValue.length === 0) {
            this.displayValue.push(value);
        }
        if (this.operationValue.length === 0) {
            this.operationValue.push(value);
        }
    }

    // Display output handler;
    display() {

        let finalDisplay = this.displayValue.join('');
        if (finalDisplay === '') {
            this.displayArea.innerHTML = '0';
        } else {
            this.displayArea.innerHTML = finalDisplay;
        }
    }

    // Clear data handler;
    clearHandler() {
        document.querySelector('.clear').addEventListener('click', () => {
            this.clear();
        })
    }
    
    clear() {
        this.displayValue = [];
        this.operationValue = [];
        this.display();
    }

}

let myCalculator = new Calculator();







