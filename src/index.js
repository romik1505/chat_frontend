import './main.css'
import Chat from './chat'
import User from './user'


const main = document.querySelector('.main')

const chat = new Chat(main)


// setTimeout(()=> {
//     chat.ui.messageForm.pushMessage({
//         username: "richard",
//         date: new Date().toLocaleTimeString(),
//         text: "hello world"
//     })

//     chat.ui.userListForm.addUser({
//         // image: "",
//         username: "valet"
//     })
// }, 4000)

// setTimeout(()=> {
//     chat.ui.messageForm.pushMessage({
//         username: "valdemar",
//         date: new Date().toLocaleTimeString(),
//         text: "hello richard"
//     })
//     chat.ui.userListForm.addUser({
//         image: "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png",
//         username: "narek"
//     })
// }, 5000)

