// Name Field


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



// Form Validation