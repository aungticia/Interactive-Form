// Name Field
const nameInput = document.getElementById('name');
nameInput.focus();

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













