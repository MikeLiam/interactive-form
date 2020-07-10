// When the page first loads, the name text field should be in focus by default.

document.querySelector('input#name').focus();

const otherJobRole = document.querySelector('#other-title');

otherJobRole.style.visibility = "hidden";

const jobRole = document.querySelector('select#title');

jobRole.addEventListener('change', (e) => {
    if(e.target.value === 'other') {
        otherJobRole.style.visibility = "visible";
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


activitiesField.addEventListener('click', (event) => {
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