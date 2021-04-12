function toggleClass(el, cls) {
    // Decide if complete class needs to be removed or added.
    const action = el.classList.contains(cls) ? 'remove' : 'add';
    // Remove/add the class.
    el.classList[action](cls);
}

class FormItem {
    constructor(input) {
        this.input = input;
        this.input.addEventListener('input', () => this.checkValidity());
        this.input.addEventListener('focus', () =>
            toggleClass(this.container, 'active')
        );
        this.input.addEventListener('blur', () =>
            toggleClass(this.container, 'active')
        );
        this.container = input.parentElement;
        this.errors = [];
        this.errorMessage = this.container.querySelector('.error');
    }
    addError(check, message, isCustom) {
        const error = { check, message, isCustom };
        this.errors.push(error);
    }
    checkValidity() {
        console.log('checking validity...');
        // Reset validity styling.
        this.input.className = '';

        for (let i = 0; i < this.errors.length; i++) {
            // Store default false check.
            let checkFailed = false;
            if (this.errors[i].isCustom) {
                console.log(this.errors[i].check);
                // If error is custom, evaluate the check as it is.
                checkFailed = this.errors[i].check();
            } else {
                // If the error's not custom, evaluate the check under the input's validity.
                checkFailed = this.input.validity[this.errors[i].check];
            }
            // If the check is true, there is an error.
            if (checkFailed) {
                this.errorMessage.textContent = this.errors[i].message;
                // Add invalid styling.
                this.input.classList.add('invalid');
                return false;
            }
        }
        // If looped through everything without finding error, then:
        this.errorMessage.textContent = '';
        // Add valid styling.
        this.input.classList.add('valid');
        return true;
    }
}

const form = document.querySelector('form');

const formItems = [...form.querySelectorAll('input')].map(
    (input) => new FormItem(input)
);

formItems.forEach((item) =>
    item.addError('valueMissing', 'Please enter a value.')
);

const email = formItems[0];
email.addError(
    'typeMismatch',
    'Please enter a valid email address. Example: name@example.com'
);

const country = formItems[1];
country.addError(
    'patternMismatch',
    'Please enter a valid country name, including only letters and spaces.'
);
country.addError(
    'tooShort',
    'Please enter a country name with at least 4 characters.'
);
const zipcode = formItems[2];
zipcode.addError(
    'patternMismatch',
    'Please enter a valid zip code consisting of 5 digits or 5 digits, followed by a dash and 4 digits. Example: 12345 or 12345-1234'
);
const password = formItems[3];
const confirmPassword = formItems[4];
confirmPassword.addError(
    function () {
        return password.input.value !== confirmPassword.input.value;
    },
    'Please enter the same password entered in the "Password" field.',
    true
);

// Check each form item's validity before submitting form.
form.addEventListener('submit', (e) => {
    for (let i = 0; i < formItems.length; i++) {
        const validity = formItems[i].checkValidity();
        if (!validity) {
            e.preventDefault();
        }
    }
});
