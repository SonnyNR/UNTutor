import axios from "axios";

class TopicService {

    acceptTopic(topicRId) {
        return axios.post(`/api/topic/request/accept/${topicRId}`);
    }

    declineTopic(topicRId) {
        return axios.post(`/api/topic/request/decline/${topicRId}`);
    }

    getTopicList(func) {
        return axios('/api/topic')
            .then(result => func(result.data));

    }

    getTopicRequestAllAdmin(func) {
        let url = '/api/topic/requests/admin';
        axios(url)
            .then(result => func(result.data));
    }

    getTopicRequestAllTutor(func) {
        let url = '/api/topic/requests/tutor';
        axios(url)
            .then(result => func(result.data));
    }

    sendTopicRequest(idTopic) {
        let url = `/api/topic/request/${idTopic}`;
        axios.post(url)
            .catch(error => console.log(error));

    }
}

export default new TopicService();