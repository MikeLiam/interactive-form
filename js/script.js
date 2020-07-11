// When the page first loads, the name text field should be in focus by default.

document.querySelector('input#name').focus();

const otherJobRole = document.querySelector('#other-title');

otherJobRole.style.display = "none";

const jobRole = document.querySelector('select#title');

jobRole.addEventListener('change', (e) => {
    if(e.target.value === 'other') {
        otherJobRole.style.display = "inherit";
    } else {
        otherJobRole.style.display = "none";
    }
});

const colorSelect = document.querySelector('select#color');

colorSelect.style.display = 'none';

const colorInfo = document.createElement('span');
colorInfo.textContent = "Please select a T-shirt theme.";

colorSelect.parentNode.appendChild(colorInfo);

const themeSelect = document.querySelector('#design');
themeSelect.querySelector('option').hidden = true;

themeSelect.addEventListener('change', (event) => {
    function selectPackColor(list,theme) {
        for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < theme.length; j++){
                if (list[i].value === theme[j]){
                    list[i].hidden = false;
                    break;
                } else {
                    list[i].hidden = true;
                }
            }
        }

    }

    colorInfo.style.display = 'none';
    colorSelect.style.display = 'inherit';
    const colorOptions = colorSelect.querySelectorAll('option');
    const theme1Options = ["cornflowerblue", "darkslategrey", "gold"];
    const theme2Options = ["tomato", "steelblue", "dimgrey"];
    if(event.target.value === "js puns") {
        selectPackColor(colorOptions, theme1Options);
        colorSelect.querySelector(`option[value=${theme1Options[0]}]`).selected = true;
    } else {
        selectPackColor(colorOptions, theme2Options);
        colorSelect.querySelector(`option[value=${theme2Options[0]}]`).selected = true;
    }
});

const activitiesField = document.querySelector('.activities');
const activities = activitiesField.querySelectorAll('input');
const totalAmount = document.createElement('span');
totalAmount.id = 'total';
totalAmount.textContent = '$0';
totalAmount.dataset.value = 0;
activitiesField.appendChild(totalAmount);


activitiesField.addEventListener('change', (event) => {
    function calcTotal(sum1,sum2,operator) {
        let total = 0;
        if (operator === '+') {
             total = parseInt(sum1) + parseInt(sum2);
        } else {
             total = parseInt(sum1) - parseInt(sum2);
        }
        totalAmount.textContent = `$${total}`;
        totalAmount.dataset.value = total;
    }
    function toggleOffOnActivities(activity,option) {
        for (let i = 0; i < activities.length; i++) {
            if (activities[i].dataset.dayAndTime === activity.dataset.dayAndTime && activities[i] !== activity) {
                    activities[i].disabled = option;
            }
        }
    }

    if (event.target.type === "checkbox") {
        let operator;

        if (event.target.checked === true) {
            operator = '+'
            toggleOffOnActivities(event.target, true);
        } else {
            operator = '-';
            toggleOffOnActivities(event.target, false);
        }
        calcTotal(totalAmount.dataset.value, event.target.dataset.cost, operator);
    }
});

const paymentSelect = document.querySelector('select#payment');
paymentSelect.querySelector('option[value="select method"]').hidden = true;
paymentSelect.querySelector('option[value="credit card"]').selected = true;
selectPayment("credit card");

function selectPayment(payment){
    const paymentField = paymentSelect.parentNode;
    const creditCard = paymentField.querySelector('#credit-card');
    const paypal = paymentField.querySelector('#paypal');
    const bitcoin = paymentField.querySelector('#bitcoin');

    if (payment === "credit card") {
        paypal.style.display = "none";
        bitcoin.style.display = "none";
        creditCard.style.display = "inherit";
    } else{
        paymentField.querySelector('#credit-card').style.display = "none";
        if (payment === "paypal") {
            bitcoin.style.display = "none";
            paypal.style.display = "inherit";
        } else {
            paypal.style.display = "none";
            bitcoin.style.display = "inherit";
        }
    } 
}

paymentSelect.addEventListener('change', (event) => {
    selectPayment(event.target.value);
});



const nameInput = document.querySelector('input#name');
const emailInput = document.querySelector('input#mail');
const creditNumber = document.querySelector('input#cc-num');
const creditZip = document.querySelector('input#zip');
const creditCvv = document.querySelector('input#cvv');

function showOrHideTip(show, element) {
    if (show) {
        element.style.display = 'inherit';
    } else {
        element.style.display = 'none';
    }
}

function validation(tester, forTest) {
    return tester.test(forTest);
}


function createListener(tester, reference) {
    return event => {
        let input;
        if (event.target === activities) {
            input = activities.querySelector('#total').dataset.value;
        } else {
            input = event.target.value;
        }
        const valid = tester(reference, input);
        const showTip = input != '' && valid;
        const toolTip = event.target.nextElementSibling;
        showOrHideTip(showTip, toolTip);
    };
}

nameInput.addEventListener('input', createListener(validation, /^[a-z]{1,}$/i));
emailInput.addEventListener('input', createListener(validation, /^[^@]+\@[^@]+(\.[a-z]{3})?\.[a-z]{3}?$/i));
creditNumber.addEventListener('input', createListener(validation, /^\d{13,16}$/));
creditZip.addEventListener('input', createListener(validation, /^\d{5}$/));
creditCvv.addEventListener('input', createListener(validation, /^\d{3}$/));
activities.addEventListener('input', createListener(validation, /^\$\d{1,}$/));