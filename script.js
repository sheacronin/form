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
        this.error = this.container.querySelector('.error');
    }
    checkValidity() {
        if (this.input.validity.valid) {
            this.error.textContent = '';
            return true;
        } else {
            this.showError();
            return false;
        }
    }
    showError() {
        if (this.input.validity.valueMissing) {
            this.error.textContent = 'Please enter an input.';
        } else if (this.input.validity.typeMismatch) {
            this.error.textContent = 'Entered value must be (type).';
        } else if (this.input.validity.patternMismatch) {
            this.error.textContent = 'Please enter a valid (type).';
        }
    }
}

const form = document.querySelector('form');

//const email = new FormItem(document.querySelector('#email'));

const formItems = [...form.querySelectorAll('input')].map(
    (input) => new FormItem(input)
);

form.addEventListener('submit', (e) => {
    for (let i = 0; i < formItems.length; i++) {
        const validity = formItems[i].checkValidity();
        if (!validity) {
            e.preventDefault();
        }
    }
});
