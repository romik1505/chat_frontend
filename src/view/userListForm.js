let userlist = require('../templates/userlist.hbs')

export default class UserListForm {
    constructor(element) {
        this.users = {}
        this.element = element
    }

    addUser(userData = {}) {
        this.users[userData.id] = userData
        this.renderDOM()
    }

    setUsers(userMap = {}) {
        // Object.assign(this.users, userMap)
        this.users = userMap
        this.renderDOM()
    }

    removeUser(username) {
        delete this.users[username]
        this.renderDOM()
    }

    renderDOM() {
        const fragment = document.createDocumentFragment()
        
        const p = document.createElement('p')
        p.textContent = "Все пользователи:"
        fragment.appendChild(p)
        
        for (const userdata of Object.values(this.users)) {
            const el = document.createElement('div')
            el.classList.add('userlist__item')
            console.log("userdata", userdata)
            el.innerHTML = userlist(userdata)

            fragment.appendChild(el)
        }
        this.element.innerHTML = ""
        this.element.appendChild(fragment)
    }
} 