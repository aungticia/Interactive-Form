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
const designSelect = document.querySelector('#design');
const colorSelect = document.querySelector('#color');
const colorOptions = colorSelect.querySelectorAll('option');

// Disable the color dropdown by default
colorSelect.disabled = true;

// Function to filter and display color options based on the selected design
const filterColorOptions = (selectedDesign) => {
    for (const option of colorOptions) {
        const dataTheme = option.getAttribute('data-theme');
        if (dataTheme === selectedDesign || dataTheme === 'default') {
            option.hidden = false;
            option.disabled = false;
        } else {
            option.hidden = true;
            option.disabled = true;
        }
    }
};

// Listen for changes in the design select element
designSelect.addEventListener('change', (e) => {
    const selectedDesign = e.target.value;

    // Enable the color dropdown
    colorSelect.disabled = false;

    // Filter and display color options based on the selected design
    filterColorOptions(selectedDesign);

    // Set the "Select Theme" option as the default selected option
    colorOptions.forEach((option) => {
        option.selected = option.getAttribute('data-theme') === 'default';
    });
});

// Initialize the color dropdown to have the "Select Theme" option selected
colorOptions.forEach((option) => {
    option.selected = option.getAttribute('data-theme') === 'default';
});


// Activities Section
const registerForActivities = document.querySelector('#activities');
const costForActivities = document.querySelector('#activities-cost');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
let total = 0;

registerForActivities.addEventListener('change', (e) => {
    const cost = parseInt(e.target.getAttribute('data-cost'));

    // Find the day and time of the selected activity
    const selectedActivityTime = e.target.getAttribute('data-day-and-time');

    for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];
        const activityTime = checkbox.getAttribute('data-day-and-time');

        if (selectedActivityTime === activityTime && e.target !== checkbox) {
            if (e.target.checked) {
                checkbox.disabled = true;
                checkbox.parentElement.classList.add('disabled');
            } else {
                checkbox.disabled = false;
                checkbox.parentElement.classList.remove('disabled');
            }
        }
    }

    if (e.target.checked) {
        total += cost;
    } else {
        total -= cost;
    }

    costForActivities.textContent = `Total: $${total}`;
});

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
const emailError = document.querySelector('#email-hint'); // Changed the ID to match your HTML
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

// Add a 'keyup' event listener to the email input field
userEmail.addEventListener('keyup', (e) => {
    // Get the current value of the email input
    const inputValue = e.target.value;

    if (inputValue.trim() === '') {
        // Show an error message for an empty email
        emailError.textContent = 'Email address is required.';
        emailError.style.display = 'block';
        e.target.parentElement.classList.remove('valid');
        e.target.parentElement.classList.add('error-border', 'not-valid');
    } else if (!isEmailValid(inputValue)) {
        // Show an error message for an invalid email format
        emailError.textContent = 'Invalid email format. Please enter a valid email address.';
        emailError.style.display = 'block';
        e.target.parentElement.classList.remove('valid');
        e.target.parentElement.classList.add('error-border', 'not-valid');
    } else {
        // Clear the error message and styles when the email is valid
        emailError.style.display = 'none';
        e.target.parentElement.classList.remove('error-border', 'not-valid');
        e.target.parentElement.classList.add('valid');
    }
});

const isCardNumberValid = (cardNumber) => {
    if (selectPayment.value === 'credit-card') { 
        return /^[0-9]{13,16}$/.test(cardNumber);
    } 
};

const isCVVValid = (cvv) => {
    if (selectPayment.value === 'credit-card') { 
        return /^[0-9]{3}$/.test(cvv);
    }
};

const isZipCodeValid = (zipCode) => {
    if (selectPayment.value === 'credit-card') { 
        return /^[0-9]{5}$/.test(zipCode);
    }
};

const isActivityValid = () => {
    return total > 0;
};

form.addEventListener('submit', (e) => {
    const validator = (inputElement, validationFunction) => {
      const inputValue = inputElement.value;
  
      if (inputElement.id === 'cc-num' && selectPayment.value !== 'credit-card') {
        return;
      }
  
      if (!validationFunction(inputValue)) {
        e.preventDefault();
        inputElement.parentElement.classList.remove('valid');
        inputElement.parentElement.classList.add('error-border', 'not-valid');
        inputElement.nextElementSibling.style.display = 'block';
      } else {
        inputElement.parentElement.classList.add('valid');
        inputElement.parentElement.classList.remove('error-border', 'not-valid');
        inputElement.nextElementSibling.style.display = 'none';
      }
    };
  
    // Validate name and email
    validator(userName, isNameValid);
    validator(userEmail, isEmailValid);
  
    // Validate payment method
    if (selectPayment.value === 'credit-card') {
      // Validate credit card details
      validator(cardNumber, isCardNumberValid);
      validator(zipCode, isZipCodeValid);
      validator(cvv, isCVVValid);
    }
  
    // Validate activities
    validator(costForActivities, isActivityValid);
  
    // Allow the form to submit when payment is PayPal or Bitcoin
    if (selectPayment.value !== 'credit-card') {
      return;
    }
  
    // If there are validation errors, prevent the default form submission
    if (document.querySelectorAll('.not-valid').length > 0) {
      e.preventDefault();
    }
  });
  

// Accessibility
const checkboxInputs = document.querySelectorAll('input[type="checkbox"]');
for (let i = 0; i < checkboxInputs.length; i++) { 
    checkboxInputs[i].addEventListener('focus', (e) => { 
        let parent = checkboxInputs[i].parentElement; 
        parent.classList.add('focus') 
    }); 
    checkboxInputs[i].addEventListener('blur', (e) => { 
        let parent = checkboxInputs[i].parentElement; 
        parent.classList.remove('focus');
    }); 
}



