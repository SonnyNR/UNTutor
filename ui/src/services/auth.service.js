import axios from "axios";

class AuthService {

    register(user, role) {
        console.log(role);
        console.log("qweqe")

        let url = `/api/${role}/register`;
        axios.post(url, user)
             .catch(error => console.log(error));
    }

    login(username, password, func) {
        return axios
            .post('/api/login', {
                username,
                password
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then(response => func(response.data))
            .catch(error => console.log(error));
    }

    logout() {
        localStorage.clear();
    }

    getUser(func) {
        axios('/api/account')
            .then(result => func(result.data));
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();
