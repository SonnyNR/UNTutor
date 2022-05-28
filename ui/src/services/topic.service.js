import axios from "axios";

class TopicService {

    getTopicList(func) {
        return axios('/api/topic')
            .then(result => func(result.data));

    }

    getTopicRequestList(func) {
        let url = '/api/topic/requests';
        axios(url)
            .then(result => func(result.data));
    }
}

export default new TopicService();