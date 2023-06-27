let zerostate = false;
let operationState = false;
let numberQuantity = 0;

let buttons = document.querySelectorAll('.numbers button');
let buttonClear = document.querySelector('.stateActions #btnAC');
let buttonEqual = document.querySelector('.stateActions #btnEqual');
let buttonDel = document.querySelector('.stateActions #btnDel');
let buttonBlock = document.querySelectorAll('.numbers .number');

let operationDisplayText = document.querySelector('.operationDisplay');
let historyDisplayText = document.querySelector('.history');


buttons.forEach( (button) => button.addEventListener('click',getButtonText));
buttonClear.addEventListener('click',clear);
buttonEqual.addEventListener('click',equal);
buttonDel.addEventListener('click',del);

window.addEventListener('keydown', keyDownAction);

function keyDownAction(event) {
    let key = document.querySelector(`[data-keyCode = "${event.keyCode}"]`);
    
    let buttons = [96,97,98,99,100,101,102,103,104,105,106,107,109,110,111];
    

    if (buttons.includes(event.keyCode)) {
        getButtonText(key,false);
    } else if (event.keyCode == 13){
        equal();
    } else if (event.keyCode == 8) {
        del();
    } else if (event.keyCode == 46){
        clear();
    }


}


function getButtonText (button, type = true) {
    
    let key;
    if (type) {
        key = button.target.id.replace('btn','');
    } else {
        key = button.id.replace('btn','');
    }

    if (key === 'Slash'){
        key = '/';
    } else if (key === 'Plus'){
        key = '+';
    } else if (key === 'Point'){
        key = '.';
    } else if (key === 'Minus'){
        key = '-';
    } else if (key === 'X'){
        key = 'x';
    } else {
        /*Do nothing */
    }

    printOperationDisplay(key);
}

function printOperationDisplay(key) {
    
    /*Verify that zero doesnt get overwritten by operation*/

    
    if (key == '/' || key == '+' || key == '-' || key == 'x'){
        if (operationState) {
            equal();
        }
        operationDisplayText.textContent = 
        operationDisplayText.textContent.concat(' ',key, ' ');
        operationState = true;
        numberQuantity = 0;
        enableButton();
    } else {
        if (!zerostate) {
            operationDisplayText.textContent = key;
        } else {
            operationDisplayText.textContent = 
            operationDisplayText.textContent.concat('',key);
        }
        
        numberQuantity += 1;
        if (numberQuantity>20) {
            blockButton();
        }
    }
    zerostate = true;

    /*Console logs to keep track of presses*/
    console.log('========');
    console.log(`zerostate is ${zerostate}`);
    console.log(`Operation Display Text: ${operationDisplayText.textContent}`);
    console.log(`Key Pressed: ${key}`);
}

function clear(){
    operationDisplayText.textContent = 0;
    historyDisplayText.textContent = 0;
    zerostate = false;
}

function equal(){

    let query = operationDisplayText.textContent;
    query = query.split(' ');
    console.log(`Operation Query: ${query}`);
    zerostate = false;
    operationState = false;

    /*Divide the query to obtain variables and operation*/
    let firstNumber = Number(query[0]);
    let operation = query[1];
    let lastNumber = Number(query[2]);
    let result = 0;

    
    /*Main Logic*/
    /*First, make sure that the variables are numbers*/
    if(!isNaN(firstNumber) && isNaN(lastNumber)){
        result = firstNumber;
    } else if(isNaN(firstNumber)){
        result = 0;
    } else {
        switch(operation){
            /*Calculating with the four basic operations */
            case '+':
                result = sum(firstNumber,lastNumber);
                break;
            case '-':
                result = substract(firstNumber,lastNumber);
                break;
            case 'x':
                result = multiply(firstNumber,lastNumber);
                break;
            case '/':
                result = div(firstNumber,lastNumber);
                break;
        }
    }

    /*Rounding up the number to six decimal places*/
    if ((!isNaN(firstNumber) && firstNumber != 0) && (!isNaN(lastNumber) && lastNumber != 0)){
        result = +(result.toFixed(10));
    } 
    

    /*Must update the history and operation display*/
    historyDisplayText.textContent = operationDisplayText.textContent;
    operationDisplayText.textContent = result;

    /*Console log for debugging*/
    console.log('========');
    console.log(`The numbers are: ${firstNumber} and ${lastNumber}`);
    console.log(`Result Calculated: ${result}`);
}

function sum (a,b) {
    return a+b;
}

function substract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function div (a,b) {
    if (b == 0){
        return 'Nop!!';
    }
    return a/b;
}

function del() {

    let ext = -1;

    /*Delete the caracters in the string*/
    if (operationDisplayText.textContent.length == 1){
        operationDisplayText.textContent = 0;
        zerostate = false;
    }else {
        /*Block to delete the space around along the operand*/
        if (operationDisplayText.textContent.slice(-1) == ' ') {
            ext = -3;
        } else {
            /*Do Nothing*/
        }
        operationDisplayText.textContent = operationDisplayText.textContent.slice(0,ext);
        console.log('Remaining: ' + Array.from(operationDisplayText.textContent));
    }

}

function blockButton() {

    /*Blocking the numbers for a given condition*/
    buttonBlock.forEach(button => {
        button.removeEventListener('click',getButtonText);
    });
}

function enableButton() {

    /*Unblocking the numbers for a given condition*/
    buttonBlock.forEach(button => {
        button.addEventListener('click',getButtonText);
    });
}