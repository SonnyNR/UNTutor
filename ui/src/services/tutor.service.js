import axios from "axios";

class TutorService {

    getTutorsByTopic(idTopic, func) {
        return axios(`/api/tutor/topic/${idTopic}`).
        then(result => func(result.data));
    }

    getTutorTopicRequestAll(func) {
        let url = '/api/tutor/requests';
        return axios(url)
            .then(result => func(result.data));
    }

    getTutorTopicAll(func) {
        let url = '/api/tutor/topics';
        axios(url)
            .then(result => func(result.data));
    }
}

export default new TutorService();