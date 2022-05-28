package untutor.service;

import untutor.domain.user.Tutor;
import untutor.domain.user.User;
import untutor.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Locale;

@Service
public class UserService
{
    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    public List<Tutor> getTutors() {
       return userRepository.getUserByRole("tutor");
    }

    public List<Object> getTutorsByTopic(String topicName) {
        List<Tutor> tutors = getTutors();
        return Arrays.asList(tutors.stream().filter(tutor -> {

            return tutor.getTopics().stream().filter(topic -> topic.getName().equals(topicName)).count() > 0;

        }).toArray());
    }

    public User save(User user)
    {
        return userRepository.save(user);
    }

    public User findByEmail(String email)
    {
        return userRepository.findByEmail(email);
    }

    public String getRoleUser(String email) {

        User user = findByEmail(email);

        String role =
                user
                        .getClass()
                        .getName()
                        .replace("untutor.domain.user.","")
                        .toLowerCase(Locale.ROOT);

        return role;
    }

}
