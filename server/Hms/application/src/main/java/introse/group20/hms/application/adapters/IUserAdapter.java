package introse.group20.hms.application.adapters;

import introse.group20.hms.core.entities.User;
import introse.group20.hms.core.exceptions.BadRequestException;

import java.util.Optional;
import java.util.UUID;

public interface IUserAdapter {
    Optional<User> findByUserId(UUID id);
    Optional<User> findByUsername(String username);
    User addUserAdapter(User user);
    void updatePasswordAdapter(String phoneNumber, String newPassword) throws BadRequestException;
    void SendAccountAdapter(String phoneNumber, User userAccount);
}