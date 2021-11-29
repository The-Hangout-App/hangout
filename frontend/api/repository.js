import axios from 'axios';

export class Repository {

    url = "http://ec2-15-223-77-234.ca-central-1.compute.amazonaws.com:8000";

    config = {
        headers: {
            Authorization: '*'
        }
    }

    getCards() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/cards`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        })
    }

    getActivity(cardId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/activities/${cardId}`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        })
    }

    getUser(username) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/user/${username}`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        })
    }

    login(username, password) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/user/${username}/${password}`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        })
    }

    createAccount(data) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/user/register`, data, this.config)
            .then(resp => {
                resolve(resp.data);
            })
            .catch(err => console.log(err));
        })
    }

    getGroups(card_id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/groups/${card_id}`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        })
    }

    getUsersInGroup(groupID) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/groups/${groupID}/`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        })
    }

    createGroup(body) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/groups`, body, this.config)
            .then(resp => {
                resolve(resp.data);
            })
            .catch(err => console.log(err));
        })
    }

    deleteUser(userID){
        return new Promise((resolve, reject) => {
        axios.delete(`${this.url}/DeleteUser/${userID}`)
        .catch(e => {
            reject();
        });
    })}

};