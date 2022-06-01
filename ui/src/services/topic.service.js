import axios from "axios";

class TopicService {

    sendMessage(topicRId, message) {
        return axios.post(`/api/topic/request/${topicRId}/message`, message,{headers: {
                'Content-Type': 'text/html',
            }});
    }

    getTopicList(func) {
        return axios('/api/topic')
            .then(result => func(result.data));

    }

    getTopicRequestAll(func) {
        let url = '/api/topic/requests';
        axios(url)
            .then(result => func(result.data));
    }

    sendTopicRequest(idTopic) {
        let url = `/api/topic/request/${idTopic}`;
        return axios.post(url)
            .catch(error => console.log(error));
    }

    acceptTopic(topicRId) {
        return axios.post(`/api/topic/request/accept/${topicRId}`);
    }

    declineTopic(topicRId) {
        return axios.post(`/api/topic/request/decline/${topicRId}`);
    }
}

export default new TopicService();