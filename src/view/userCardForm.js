const userCardTemplate = require('../templates/usercard.hbs')

export default class UserCardForm {
    constructor(element, onUpload) {
        this.element = element
        this.onUpload = onUpload

        this.element.addEventListener("dragover", (e)=>{
            if (e.dataTransfer.items.length && e.dataTransfer.items[0].kind === 'file') {
                console.log('dragover')
                e.preventDefault()
            }
        })

        this.element.addEventListener("drop", (e) => {
            const file = e.dataTransfer.items[0].getAsFile()    
            this.onUpload(file)

            e.preventDefault()
        })
    }

    setUserData(user) {
        this.user = user
    }

    renderDOM(){
        this.element.dataset.peer = this.user.id
        this.element.innerHTML = userCardTemplate(this.user)
    }

    setPhoto(data) {
        this.element.querySelector('[data-role=img]').src = data
    }

    show(){
        this.element.classList.remove('hide')
    }

}