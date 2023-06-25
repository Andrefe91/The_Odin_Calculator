let zerostate = false;
let operationState = 0;

let buttons = document.querySelectorAll('button');
let operationDisplayText = document.querySelector('.operationDisplay');



buttons.forEach( (button) => button.addEventListener('click',getButtonText));



function getButtonText (button) {

    let key = button.target.id.replace('btn','');

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
    if (!zerostate){
        if (key == '/' || key == '+' || key == '-' || key == 'x'){
            operationDisplayText.textContent = 
            operationDisplayText.textContent.concat(' ',key);
        } else {
            operationDisplayText.textContent = key;
        }
        zerostate = true;
    } else {

        if (key == '/' || key == '+' || key == '-' || key == 'x'){
            operationDisplayText.textContent = 
            operationDisplayText.textContent.concat(' ',key, ' ');
        } else {
            operationDisplayText.textContent = 
            operationDisplayText.textContent.concat('',key);
        }
    }

    console.log('========');
    console.log(`zerostate is ${zerostate}`);
    console.log(`Operation Display Text: ${operationDisplayText.textContent}`);
    console.log(`Key Pressed: ${key}`);
}