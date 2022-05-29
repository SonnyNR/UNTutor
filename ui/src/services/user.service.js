import axios from "axios";

class UserService {

    getTutorsByTopic(idTopic, func) {
        return axios(`/api/tutor/topic/${idTopic}`).
            then(result => func(result.data));
    }
}

export default new UserService();