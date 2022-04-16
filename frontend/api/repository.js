import axios from 'axios';

export class Repository {

    url = "https://hangout-api-emzxyeiygq-uc.a.run.app";

    config = {
        headers: {
            Authorization: '*'
        }
    }

    getNewGid() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/newestGroup`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        })
    }

    joinGroup(gid, uid) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/groups/${gid}/${uid}`, {}, this.config)
            .then(resp => {
                resolve(resp.data);
            })
            .catch(err => console.log(err));
        })
    }

    getGroupById(group_id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/groups/groupid/${group_id}`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        })
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

    getUsersGroups(userId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/users/${userId}/groups`, this.config)
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

    login(body) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/login`, body, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        })
    }

    createAccount(body) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/registerUser`, body, this.config)
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

    getUsersInGroup(group_id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/users_in_groups/${group_id}`, this.config)
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

    getUserByID(id){
        return new Promise((resolve, reject) => {
            //axios.get(`${this.url}/account/${id}`)
            axios.get(`${this.url}/getUserByID/${id}`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        })
    }

    updateUser(id, body){
        return new Promise((resolve, reject) => {
            //axios.get(`${this.url}/account/${id}`)
            axios.put(`${this.url}/updateUser/${id}`, body, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        })
    }

    deleteUser(id){
        return new Promise((resolve, reject) => {
            //axios.get(`${this.url}/account/${id}`)
            axios.delete(`${this.url}/DeleteUser/${id}`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        })
    }

    registerUser(passedState){
        return new Promise((resolve, reject) => {
            //axios.get(`${this.url}/account/${id}`)
            axios.post(`${this.url}/registerUser`,{
                "username": passedState.username,
                "password": passedState.password
            }, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        })
    }


};

