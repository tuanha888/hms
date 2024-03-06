package introse.group20.hms.infracstructure.adapters;

import introse.group20.hms.application.adapters.IUserAdapter;
import introse.group20.hms.core.entities.User;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.infracstructure.models.UserModel;
import introse.group20.hms.infracstructure.repositories.IUserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;
@Component
public class UserAdapter implements IUserAdapter {
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public User addUserAdapter(User user) {
        UserModel userModel = modelMapper.map(user, UserModel.class);
        UserModel createdUser = userRepository.save(userModel);
        return modelMapper.map(createdUser, User.class);
    }

    @Override
    public void updatePasswordAdapter(String phoneNumber, String newPassword) throws BadRequestException {
        UserModel userModel = userRepository.findByUsername(phoneNumber)
                .orElseThrow(() -> new BadRequestException("Incorrect login credentials"));
        userModel.setPassword(encoder.encode(newPassword));
        userRepository.save(userModel);
    }

    @Override
    public void SendAccountAdapter(String phoneNumber, User userAccount) {

    }

    @Override
    public Optional<User> findByUserId(UUID id) {
         return  userRepository.findById(id)
                 .map(userModel -> modelMapper.map(userModel, User.class));
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(userModel -> modelMapper.map(userModel, User.class));
    }
}
