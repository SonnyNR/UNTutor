import axios from "axios";

class UserService {

    getTutorsByTopic(idTopic, func) {
        return axios(`/api/topic/tutors/${idTopic}`).
            then(result => func(result.data));
    }
}

export default new UserService();