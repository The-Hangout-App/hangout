import axios from 'axios';

export class Repository {

    url = "http://ec2-15-223-77-234.ca-central-1.compute.amazonaws.com:8000";

    config = {
        headers: {
            Authorization: '*'
        }
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

    getGroups(activityID) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/activities/${activityID}`, this.config)
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

    deleteUser(userID){
        return new Promise((resolve, reject) => {
        axios.delete(`${this.url}/DeleteUser/${userID}`)
        .catch(e => {
            reject();
        });
    })}


    //Example post route
    addAccount(state) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/account`, state, this.config).then(resp => {
                if(resp.data == "L")
                {
                    return alert("Email already in use");
                }
                else {
                    resolve(resp.data);
                }
            }).catch(err => alert(err));
        });
    }

    //Example delete route
    deleteAccount(){
        return new Promise((resolve, reject) => {
        axios.delete(`${this.url}/account`)
        .catch(e => {
            reject();
        });
    })}
    
    //Sample get route
    getAccountInfo(id) {
        return new Promise((resolve, reject) => {
            //axios.get(`${this.url}/account/${id}`)
            axios.get(`${this.url}/account/${id}`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        })
    }

};