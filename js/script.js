
// When the page first loads, the name text field should be in focus by default.

document.querySelector('input#name').focus();

// Hide input for other job role if JavaScript is active
const otherJobRole = document.querySelector('#other-title');
otherJobRole.style.display = "none";

// Show input for other job role if other job role is selected
const jobRole = document.querySelector('select#title');
jobRole.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherJobRole.style.display = "inherit";
    } else {
        otherJobRole.style.display = "none";
    }
});

const colorSelect = document.querySelector('select#color');

colorSelect.style.display = 'none';
colorSelect.previousElementSibling.style.visibility = 'hidden';

const colorInfo = document.createElement('span');
colorInfo.textContent = "Please select a T-shirt theme.";

colorSelect.parentNode.appendChild(colorInfo);

const themeSelect = document.querySelector('#design');
themeSelect.firstElementChild.disabled = true;
const colorOptions = [...colorSelect.querySelectorAll('option')];


themeSelect.addEventListener('change', (event) => {
    function selectPackColor(list, theme) {
        while (colorSelect.firstElementChild){
            colorSelect.removeChild(colorSelect.firstElementChild);
        }
        for(let i = 0; i < list.length; i++){
            for (let j = 0; j < theme.length; j++) {
                if (list[i].value === theme[j]) {
                    colorSelect.appendChild(list[i]);
                    break;
                } 
            }
        }
    }

    colorInfo.style.display = 'none';
    colorSelect.style.display = 'inherit';
    colorSelect.previousElementSibling.style.visibility = 'visible';

    const theme1Options = ["cornflowerblue", "darkslategrey", "gold"];
    const theme2Options = ["tomato", "steelblue", "dimgrey"];

    if (event.target.value === "js puns") {
        selectPackColor(colorOptions, theme1Options);
        colorSelect.querySelector(`option[value=${theme1Options[0]}]`).selected = true;
    } else {
        selectPackColor(colorOptions, theme2Options);
        colorSelect.querySelector(`option[value=${theme2Options[0]}]`).selected = true;
    }
});

const activitiesField = document.querySelector('.activities div');
const activities = activitiesField.querySelectorAll('input');
const totalAmount = document.createElement('p');
totalAmount.id = 'total';
totalAmount.textContent = '$0';
totalAmount.dataset.value = 0;
activitiesField.appendChild(totalAmount);


activitiesField.addEventListener('change', (event) => {
    function calcTotal(sum1, sum2, operator) {
        let total = 0;
        if (operator === '+') {
            total = parseInt(sum1) + parseInt(sum2);
        } else {
            total = parseInt(sum1) - parseInt(sum2);
        }
        totalAmount.textContent = `$${total}`;
        totalAmount.dataset.value = total;
    }

    function toggleOffOnActivities(activity, option) {
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
            showInfo('', document.querySelector('span.js-activities-span'));
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

function selectPayment(payment) {
    const paymentField = paymentSelect.parentNode;
    const creditCard = paymentField.querySelector('#credit-card');
    const paypal = paymentField.querySelector('#paypal');
    const bitcoin = paymentField.querySelector('#bitcoin');

    if (payment === "credit card") {
        paypal.style.display = "none";
        bitcoin.style.display = "none";
        creditCard.style.display = "inherit";
    } else {
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

function createSpan(typeSpan, inputElement) {
    const element = document.createElement('span');
    element.className = typeSpan;
    element.style.display = 'none';
    inputElement.parentNode.appendChild(element);
}

createSpan('js-info-span', nameInput);
createSpan('js-info-span', emailInput);
createSpan('js-info-span', creditNumber);
createSpan('js-info-span', creditZip);
createSpan('js-info-span', creditCvv);
createSpan('js-activities-span', activitiesField.querySelector('p#total'));

function validation(forTest, tester) {
    return tester.test(forTest) && forTest != '';
}

function showInfo(message, element) {
    console.log(element);
    if (message === '') {
        element.style.display = 'none';
        if (element.previousElementSibling.tagName === 'INPUT') {
            element.previousElementSibling.style.border = 'green solid';
        }
        element.classList.remove('error');
    } else {
        element.style.display = 'inherit';
        element.classList.add('error');
        element.textContent = message;
        if (element.previousElementSibling.tagName === 'INPUT') {
            element.previousElementSibling.style.border = 'red solid';
        }
    }
}

function createListener(reference, label, message) {
    return event => {
        let input;
        let element = event.target.nextElementSibling;

        input = event.target.value;

        const valid = validation(input, reference);

        if (input.length === 0) {
            showInfo(`Please enter a ${label}.`, element);
        } else if (!valid) {
            console.log(event.target);
            showInfo(message, element);
        } else {
            showInfo('', element);
        }
    };
}

nameInput.addEventListener('input', createListener(/^[a-z]{1,}$/i, 'name', "Only a-z letters permited"));
emailInput.addEventListener('input', createListener(/^[^@]+\@[^@]+(\.[a-z]{3})?\.[a-z]{3}?$/i, 'e-mail address', 
"Should be a validly formatted e-mail address"));
creditNumber.addEventListener('input', createListener(/^\d{13,16}$/, 'credit card number',
"Credit Card should be number between 13 and 16 digits." ));
creditZip.addEventListener('input', createListener(/^\d{5}$/, 'Zip Code number', 
"The Zip Code should be a 5-digit number."));
creditCvv.addEventListener('input', createListener(/^\d{3}$/, 'CVV number', 
"The CVV number should be a 3-digit number."));

const form = document.querySelector('form');


function validateErrors() {
    function validateActivities() {

        for (let i = 0; i < activities.length; i++) {
            if (activities[i].checked) {
                showInfo('', 
                document.querySelector('span.js-activities-span'))
                return true;
            } else {
                showInfo('Please at least one activity should be seleceted',
                document.querySelector('span.js-activities-span'));
            }
        }

        return false;
    }

    const spanElements = document.querySelectorAll('span.js-info-span');
    let noError = true;

    for (let i = 0; i < spanElements.length; i++) {
        if (spanElements[i].style.display === 'inherit') {
            noError = false;
        } else if (spanElements[i].previousElementSibling.value === '') {
                showInfo('Please fill this field', spanElements[i]);
                console.log(spanElements[i]);
                noError = false;
        }
    }
    noError = validateActivities() && noError;
    if (!noError){
        document.querySelector('span.error').previousElementSibling.focus();
    }
    return noError;
}

form.addEventListener('submit', (e) => {

    if (validateErrors()) {
        // Submit form
    } else {
        e.preventDefault();
    }

});