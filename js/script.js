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