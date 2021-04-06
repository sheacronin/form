function toggleClass(el, cls) {
    // Decide if complete class needs to be removed or added.
    const action = el.classList.contains(cls) ? 'remove' : 'add';
    // Remove/add the class.
    el.classList[action](cls);
}

class FormItem {
    constructor(container) {
        this.container = container;
        this.input = container.querySelector('input');
        this.input.addEventListener('input', () => this.checkValidity());
        this.input.addEventListener('focus', () =>
            toggleClass(this.container, 'active')
        );
        this.input.addEventListener('blur', () =>
            toggleClass(this.container, 'active')
        );
        this.error = container.querySelector('.error');
    }
    checkValidity() {
        if (!this.input.validity.valid) {
            console.log('There is an error.');
        }
    }
    showError() {}
}

// const email = new FormItem(document.querySelector('#email'));

const form = document.querySelector('form');
const formItems = form.querySelectorAll('.form-item');
formItems.forEach((item) => {
    const formItem = new FormItem(item);
    console.log(formItem);
});
// form.addEventListener('submit', )

//console.log(email);
