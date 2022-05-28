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

  function getAccount(success) {
    const url = '/api/account'
    axios(url)
      .then(result => { success(result.data);});
  }

  function addUser(user, role) {

    let url = `/api/${role}/register`;
    axios.post(url, user)
    .catch(error => console.log(error));

  }

  function getRole(success) {
    let url = '/api/role';
    axios(url)
        .then(result => success(result.data));
  }

  function getTopics(success) {
    let url = '/api/topic';
    axios(url)
        .then(result => success(result.data));

  }

  function getTopicRequests(success) {
    let url = '/api/topic/requests';
    axios(url)
        .then(result => success(result.data));
  }

  function sendTopicRequest(id_topic) {
    let url = `/api/topic/request/${id_topic}`;
    console.log(id_topic);
    axios.post(url)
        .catch(error => console.log(error));

  }

  return {
    login,
    getAccount,
    addUser,
    getRole,
    getTopics,
    sendTopicRequest,
    getTopicRequests,
  };

}());

