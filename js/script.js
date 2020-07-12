
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

// Hide color selection and color label till one theme is selected
const colorSelect = document.querySelector('select#color');
colorSelect.style.display = 'none';
colorSelect.previousElementSibling.style.visibility = 'hidden';
// And show info
const colorInfo = document.createElement('p');
colorInfo.textContent = "Please select a T-shirt theme.";
colorSelect.parentNode.appendChild(colorInfo);

// Theme selection 'Select a theme' disabling 
const themeSelect = document.querySelector('#design');
themeSelect.firstElementChild.disabled = true;
// and create a copy of color options for reasson below
const colorOptions = [...colorSelect.querySelectorAll('option')];
// Listener for change at theme selection
themeSelect.addEventListener('change', (event) => {
    // For crossbrowser compatibility (safari doesn't support atribute hidden) 
    // remove and append colors as a theme is selected
    function selectPackColor(list, theme) {
        // First remove all colors
        while (colorSelect.firstElementChild){
            colorSelect.removeChild(colorSelect.firstElementChild);
        }
        // Then append theme's colors
        for(let i = 0; i < list.length; i++){
            for (let j = 0; j < theme.length; j++) {
                if (list[i].value === theme[j]) {
                    colorSelect.appendChild(list[i]);
                    break;
                } 
            }
        }
    }
    // At a theme selected, show color selection and color label hidding info
    colorInfo.style.display = 'none';
    colorSelect.style.display = 'inherit';
    colorSelect.previousElementSibling.style.visibility = 'visible';
    // colors availables for each theme option
    const theme1Options = ["cornflowerblue", "darkslategrey", "gold"];
    const theme2Options = ["tomato", "steelblue", "dimgrey"];
    // Selection
    if (event.target.value === "js puns") {
        selectPackColor(colorOptions, theme1Options);
        colorSelect.querySelector(`option[value=${theme1Options[0]}]`).selected = true;
    } else {
        selectPackColor(colorOptions, theme2Options);
        colorSelect.querySelector(`option[value=${theme2Options[0]}]`).selected = true;
    }
});

// Activities field
const activitiesField = document.querySelector('.activities div');
const activities = activitiesField.querySelectorAll('input');
// Create and append a total cost for activities selected
const totalAmount = document.createElement('p');
totalAmount.id = 'total';
totalAmount.textContent = '$0';
totalAmount.dataset.value = 0;
activitiesField.appendChild(totalAmount);

// Listener for a change at activities selected
activitiesField.addEventListener('change', (event) => {
    /**
     * Calculate new total cost afer add (operator +) a new activity cost (sum2)
     * or substract (operator -) to current total (sum1)
     * @param {string} sum1 
     * @param {string} sum2 
     * @param {string} operator 
     */
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
    /**
     * Toggle disabled property at (option) value of other activities if 
     * have same time/day that a selected/deselected (activity)
     * @param {HTML element} activity 
     * @param {Boolean} option 
     */
    function toggleOffOnActivities(activity, option) {
        for (let i = 0; i < activities.length; i++) {
            if (activities[i].dataset.dayAndTime === activity.dataset.dayAndTime && activities[i] !== activity) {
                activities[i].disabled = option;
            }
        }
    }
    // When a input type checkbox is clicked
    if (event.target.type === "checkbox") {
        let operator;
        // If it is for check, operator for add cost and watch if disable other activity at same time/day
        if (event.target.checked === true) {
            operator = '+'
            toggleOffOnActivities(event.target, true);
            showInfo('', document.querySelector('span.js-activities-span'));
        } else { // operator for substract cost and watch if may undo disable other actvity at same time/day
            operator = '-';
            toggleOffOnActivities(event.target, false);
        }
        calcTotal(totalAmount.dataset.value, event.target.dataset.cost, operator);
    }
});

// Payment field
const paymentSelect = document.querySelector('select#payment');
// Disable "select method" option
paymentSelect.querySelector('option[value="select method"]').disabled = true;
paymentSelect.querySelector('option[value="credit card"]').selected = true;

/**
 * Event Handler to show payment selected and hide others
 * @param {String} payment 
 */
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
// By default "credit card" payment is selected
selectPayment("credit card");
// Listener for payment selection
paymentSelect.addEventListener('change', (event) => {
    selectPayment(event.target.value);
});

// Inputs for validation
const nameInput = document.querySelector('input#name');
const emailInput = document.querySelector('input#mail');
const creditNumber = document.querySelector('input#cc-num');
const creditZip = document.querySelector('input#zip');
const creditCvv = document.querySelector('input#cvv');

/**
 * Create span to show messages at inputs validation or submit form
 * @param {String} typeSpan 
 * @param {HTML element} inputElement 
 */
function createSpan(classSpan, inputElement) {
    const element = document.createElement('span');
    element.className = classSpan;
    element.style.display = 'none';
    inputElement.parentNode.appendChild(element);
}
// One span for each field to validate
createSpan('js-info-span', nameInput);
createSpan('js-info-span', emailInput);
createSpan('js-info-span', creditNumber);
createSpan('js-info-span', creditZip);
createSpan('js-info-span', creditCvv);
createSpan('js-activities-span', activitiesField.querySelector('p#total'));
/**
 * General method for validate an input (forTest) with a given regular expression (tester)
 * @param {String} forTest 
 * @param {RegEx} tester 
 */
function validation(forTest, tester) {
    return tester.test(forTest) && forTest != '';
}

/**
 * Toggle visibility of span element and warning color for input elements. 
 * Class error let us identificate active span element.
 * @param {String} message 
 * @param {HTML element} element 
 */
function showInfo(message, element) {
    console.log(element);
    if (message === '') {
        element.style.display = 'none';
        if (element.previousElementSibling.tagName === 'INPUT') {
            element.previousElementSibling.style.border = 'darkgreen solid 0.1em';
        }
        element.classList.remove('error');
    } else {
        element.style.display = 'inherit';
        element.classList.add('error');
        element.textContent = message;
        if (element.previousElementSibling.tagName === 'INPUT') {
            element.previousElementSibling.style.border = '#ac313b solid 0.2em';
        }
    }
}
/**
 * Create an event handler for each input to validate it with a Regular Expression (reference)\
 * and show info warning user if needed:
 * basic warning at blanck input to enter info with (label) 
 * advanced warning with info needed with (message)
 * @param {RegEx} reference 
 * @param {String} label 
 * @param {String} message 
 */
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

// Input listeners
nameInput.addEventListener('input', createListener(/^[a-z]{1,}$/i, 'name', "Only a-z letters permited"));
emailInput.addEventListener('input', createListener(/^[^@]+\@[^@]+(\.[a-z]{3})?\.[a-z]{3}?$/i, 'e-mail address', 
"Should be a validly formatted e-mail address"));
creditNumber.addEventListener('input', createListener(/^\d{13,16}$/, 'credit card number',
"Credit Card should be number between 13 and 16 digits." ));
creditZip.addEventListener('input', createListener(/^\d{5}$/, 'Zip Code number', 
"The Zip Code should be a 5-digit number."));
creditCvv.addEventListener('input', createListener(/^\d{3}$/, 'CVV number', 
"The CVV number should be a 3-digit number."));

// At submit form validation
const form = document.querySelector('form');

/**
 * Run test to know if there is some warning shown, some empty input or none activity selected.
 */
function validateErrors() {
    /**
     * Activity test module
     */
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
        // Warnings shown test module
        if (spanElements[i].style.display === 'inherit') {
            noError = false;
        } else if (spanElements[i].previousElementSibling.value === '') {
            // Empty inputs test module
                showInfo('Please fill this field', spanElements[i]);
                console.log(spanElements[i]);
                noError = false;
        }
    }
    noError = validateActivities() && noError;
    // Focus at first input with a warning
    if (!noError){
        document.querySelector('span.error').previousElementSibling.focus();
    }
    return noError;
}

// Listener for submit form
form.addEventListener('submit', (e) => {

    if (validateErrors()) {
        // Send form inormation
    } else {
        e.preventDefault();
    }

});