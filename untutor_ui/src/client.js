import axios from 'axios';

window.client = (function () {

  function login(username, password, success) {

    const user = {
      username:username,
      password:password,
    }

    axios.post('/api/login', user, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then(result => success(result.data))
      .catch(error => console.log(error));
  }

  function getRole(success) {
    const url = '/api/role'
    axios(url)
      .then(result => { success(result.data);});
  }

  function addUser(user, role) {

    let url = `/api/${role}/register`;
    axios.post(url, user)
    .catch(error => console.log(error));

  }

  function getUser(role, success) {
    let url = '/api/' + role;
    axios(url)
      .then(result => success(result.data));
  }

  return {
    login,
    getRole,
    addUser,
    getUser,
  };

}());
