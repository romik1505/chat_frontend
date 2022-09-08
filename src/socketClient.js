export default class socketClient {
    constructor(url, onMessage, onOpen, onError) {
        this.url = url
        this.onMessage = onMessage
        this.onOpen = onOpen
        this.onError = onError
    }

    connect(ticket){
        return new Promise((resolve, reject) => {
            this.websocket = new WebSocket(this.url)
            this.websocket.onmessage = this.onMessage
            this.websocket.onerror = reject
            this.websocket.addEventListener('open', resolve)
            this.websocket.onopen = this.onOpen
        })
    }

    pushMessage(msg = "") {
        const event = {
            type: "push_message",
            data: {
                text: msg
            }
        }
        this.sendEvent(event)
    }

    sendEvent(event) {
        this.websocket.send(JSON.stringify(event))
    }
}
