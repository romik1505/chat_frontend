import SocketClient from "./socketClient";
import User from "./user";
import AuthForm from "./view/authForm";
import MsgForm from "./view/msgForm";
import UserCardForm from "./view/userCardForm";
import UserListForm from './view/userListForm';

export default class ChatManager {
    constructor(chatElement) {
        this.element = chatElement
        this.users = {}

        this.user = new User()

        this.ui = {
            authForm: new AuthForm(
                document.querySelector('.auth__form'),
                this.onLogin.bind(this)
            ),
            messageForm: new MsgForm(
                document.querySelector('.chat__content'),
                this.onPushMessage.bind(this)
            ),
            userListForm: new UserListForm(
                document.querySelector('.userlist')
            ),
            userCardForm: new UserCardForm(
                document.querySelector('.user__card'),
                this.onUploadPhoto.bind(this)
            )
        };

        this.socketClient = new SocketClient(
            `ws://localhost:8000/ws`,
            this.onMessage.bind(this),
            this.onOpenSocket.bind(this),
            this.onSocketError.bind(this)
        )

        this.ui.authForm.showForm()
    }

    // при получении сообщения
    onMessage(msg) {
        const event = JSON.parse(msg.data)        
        console.log('handleEvent', event)

        switch (event.type) {
            case "push_message":
                this.ui.messageForm.pushMessage(
                    {   
                        id: event.data.sender.id,
                        username: event.data.sender.username,
                        img: event.data.sender.img,
                        date: new Date(event.date).toLocaleTimeString(),
                        text: event.data.text
                    })
                break;
            case "connect":
                this.ui.messageForm.pushConnectionMessage(event.data.user.username)
                this.ui.userListForm.addUser(event.data.user)
                break;
            case "disconnect":
                this.ui.messageForm.pushDisconnectionMessage(event.data.user.username)
                this.ui.userListForm.removeUser(event.data.user.username)
                break;
            case "user_list":
                this.users = event.data.users
                this.ui.userListForm.setUsers(this.users)
                break;
            case "change_userdata":
                this.users = {...this.users, ...event.data.updates}
                this.ui.userListForm.setUsers(this.users)
                this.ui.messageForm.updateUser(event.data.updates)
            default:
                console.log('default', event.type)
                break;
        }
    }

    onUploadPhoto(file) {
        const formData = new FormData()
        formData.append("user_id", this.user.data.id)
        formData.append('uploadFile', file)

        fetch("http://localhost:8080/upload",{
            method: 'POST',
            headers:{
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        })
        this.ui.userCardForm.setPhoto(file)
    }

    onOpenSocket(e) {
        this.socketClient.sendEvent({
            type: "connect",
            data: {
                username: this.user.data.id,
                ticket: this.user.data.id
            }
        })
    }

    onSocketError(msg) {
        console.log("Соединение потеряно, попытка переподключения")
        setTimeout(() => {
            this.socketClient.init()
        }, 5000)
    }

    onPushMessage(msg) {
        this.socketClient.pushMessage(msg)
    }

    async onLogin(username) {
        this.user.auth(username).then(d => {
                this.ui.authForm.hideForm()
                this.showChat()
                this.ui.userCardForm.setUserData(this.user.data)
                this.ui.userCardForm.renderDOM()
                return this.user.data
            }
        ).then(user => this.socketClient.connect(user.id))
        .catch(d => console.log(d))
    }

    showChat() {
        this.element.classList.remove('hide')
    }
}
