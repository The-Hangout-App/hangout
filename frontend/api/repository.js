import axios from 'axios';

export class Repository {

    url = "hangoutdockercompose.cujwz265lxoq.ca-central-1.rds.amazonaws.com";

    config = {
        headers: {
            Authorization: '*'
        }
    }

    getUser(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/user/${id}`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        })
    }


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