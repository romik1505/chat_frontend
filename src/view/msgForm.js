let msg_form = require('../templates/message.hbs')

export default class MsgForm {
    constructor(element, onPushMessage) {
        this.element = element
        this.onPushMessage = onPushMessage
        this.input = document.querySelector('#message')
        this.btn = document.querySelector('#send')

        this.btn.addEventListener('click', (e)=>{
            const message = this.input.value
            this.onPushMessage(message)
        })

        this.input.addEventListener('keydown', (e)=>{
            if (e.key == "Enter") {
                const message = this.input.value
                this.onPushMessage(message)
            }
        })
    }

    pushMessage(msg = {}) {
        console.log('MsgForm push')
        console.log(msg)
        const el = document.createElement('div')
        el.classList.add("msg__item")
        el.dataset.peer = msg.id
        el.innerHTML = msg_form(msg)
        this.element.appendChild(el)
        this.element.scrollTop = this.element.scrollHeight
        this.input.value=''
    }

    pushEventMessage(msg) {
        const el = document.createElement('div')
        el.innerHTML = msg
        el.classList.add('event_msg')
        this.element.appendChild(el)
    }

    pushConnectionMessage(username) {
        this.pushEventMessage(`Пользователь ${username} вошел в чат.`)
    }

    pushDisconnectionMessage(username) {
        this.pushEventMessage(`Пользователь ${username} вышел из чата.`)
    }

    updateUser(updates) {
        const id = Object.keys(updates)[0]
        const elements = document.querySelectorAll(`[data-peer="${id}"]`)
        for (const element of elements) {
            element.querySelector('[data-role=img]').outerHTML = `
            <img src="${updates[id].img}" data-role="img">
            `
            element.querySelector('[data-role=username]').textContent = updates[id].username
        }
    }
}
