// let auth_form = require('./templates/auth.hbs')


export default class AuthForm {
    constructor(element, onLogin) {
        this.element = element
        this.onLogin = onLogin

        const submit = this.element.querySelector('.submit__btn')
        const usernameInput = this.element.querySelector('#username')

        submit.addEventListener('click', e => {
            e.preventDefault()

            const name = usernameInput.value.trim()
            if (!name){
                console.log('Введите имя')
                return
            } 
            this.onLogin(usernameInput.value.trim())
        })
    }
    
    showForm() {
        this.element.classList.remove('hide')
    }

    hideForm() {
        this.element.classList.add('hide')
    }
}

