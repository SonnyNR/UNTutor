package untutor.service;

import untutor.domain.user.User;
import untutor.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService
{
    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    public User save(User user)
    {
        return userRepository.save(user);
    }

    public User findByEmail(String email)
    {
        return userRepository.findByEmail(email);
    }

}
