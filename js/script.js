// Name Field
const userName = document.getElementById('name');
userName.focus();

// Job Role Section
const roles = document.getElementById('title');
const other = document.getElementById('other-job-role');
other.style.display = 'none';

roles.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        other.style.display = 'block';
    } else {
        other.style.display = 'none';
    }
});
// T-Shirt Info Section
const design = document.querySelector('#design');
const colorOptions = document.querySelectorAll('option[data-theme');
const color = document.querySelector('#color');
color.disabled = true;

design.addEventListener('change', (e) => {
    color.disabled = false;
    
    for (let i = 0; i < colorOptions.length; i++) {
        if (design.value === colorOptions[i].getAttribute('data-theme')) {
            colorOptions[i].hidden = true;
            colorOptions[i].disabled = true;
        } else {
            colorOptions[i].hidden = false;
            colorOptions[i].disabled = false;
        }
    }
});

// Activities Section
const registerForActivities = document.querySelector('#activities');
const costForActivities = document.querySelector('#activities-cost');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
let total = 0; 

registerForActivities.addEventListener('change', (e) => {
    const cost = parseInt(e.target.getAttribute('data-cost'));
    if (e.target.checked) {
        total += cost;
    } else {
        total -= cost;
    }
    costForActivities.textContent = `Total : $${total}`; 
    console.log(total);
});
costForActivities.textContent = `Total : $0`;


// Payment Info Section
const paymentMethod = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const payPal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');

paymentMethod.addEventListener('change', (e) => {
    payPal.style.display = 'none';
    bitcoin.style.display = 'none';
    creditCard.style.display = 'none';

    if (e.target.value === 'credit-card') {
        creditCard.style.display = 'block';
    } else if (e.target.value === 'paypal') {
        payPal.style.display = 'block';
    } else if (e.target.value === 'bitcoin') {
        bitcoin.style.display = 'block';
    }
});
payPal.style.display = 'none';
bitcoin.style.display = 'none';
paymentMethod.children[1].setAttribute('selected', true);

// Form Validation
const form = document.querySelector('form');
const userEmail = document.querySelector('#email');
const cardNumber = document.querySelector('#cc-num');
const zipCode = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const selectPayment = document.querySelector('#payment');
const checkBox = document.querySelectorAll('input[type="checkbox"]');

const isNameValid = (userName) => {
    return /^[\S\s]+[\S]+$/i.test(userName);
};

const isEmailValid = (userEmail) => {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(userEmail);
};

const isCardNumberValid = (cardNumber) => {
    if (selectPayment.value === 'credit-card') { 
        return /^[0-9]{13,16}$/.test(cardNumber); } 
};

const isCVVValid = (cvv) => {
    if (selectPayment.value === 'credit-card') { 
        return /^[0-9]{3}$/.test(cvv); }
};

const isZipCodeValid = (zipCode) => {
    if (selectPayment.value === 'credit-card') { 
        return /^[0-9]{5}$/.test(zipCode); }
};

const isActivityValid = () => {
    return total > 0;
};

form.addEventListener('submit', (e) => { 
    const validator = (inputElement, validationFunction) => { 
    const inputValue = inputElement.value; 
        if (!validationFunction(inputValue)) { 
            e.preventDefault(); inputElement.parentElement.classList.remove('valid'); 
            inputElement.parentElement.classList.add('error-border', 'not-valid'); 
            inputElement.nextElementSibling.style.display = 'block'; 
        } else { 
            inputElement.parentElement.classList.add('valid'); 
            inputElement.parentElement.classList.remove('error-border', 'not-valid'); 
            inputElement.nextElementSibling.style.display = 'none'; 
        } 
    }; 
        validator(userName, isNameValid); 
        validator(userEmail, isEmailValid); 
        validator(cardNumber, isCardNumberValid); 
        validator(zipCode, isZipCodeValid); 
        validator(cvv, isCVVValid); 
        validator(costForActivities, isActivityValid); 
}); 

// Accessibility
const checkBoxInput = document.querySelectorAll('input[type="checkbox"]');
for (let i = 0; i < checkBoxInput.length; i++) { 
    checkBoxInput[i].addEventListener('focus', (e) => { 
        let parent = checkBoxInput[i].parentElement; 
        parent.classList.add('focus') 
    }); 
    checkBoxInput[i].addEventListener('blur', (e) => { 
        let parent = checkBoxInput[i].parentElement; 
        parent.classList.remove('focus');
    }); 
}

