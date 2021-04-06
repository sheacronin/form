console.log('ello');

class FormItem {
    constructor(el) {
        this.el = el;
        this.el.addEventListener('input', (e) => this.checkValidity(e));
    }
    checkValidity(event) {
        if (!this.el.validity.valid) {
            console.log('There is an error.');
            event.preventDefault();
        }
    }
}

const email = new FormItem(document.querySelector('#email'));

console.log(email);
