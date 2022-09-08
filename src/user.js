export default class User {
    auth(username) {
        return fetch("http://localhost:8000/login",{
            method: "POST",
            body: JSON.stringify({
                username: username
            })
        }).then(d => d.json()).then(u => this.data = u.user)
    }

    updateUserdata(data = {}) {
        return fetch("http://localhost:8000/", {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(d => d.json()).then(this.data = data)
    }
}
