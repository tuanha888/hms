package introse.group20.hms.application.services.interfaces;

import introse.group20.hms.core.entities.User;
import introse.group20.hms.core.entities.enums.Role;
import introse.group20.hms.core.exceptions.BadRequestException;

public interface IUserService {
    User Login(String phoneNumber, String password);


    User addUser(User user);
    void updatePassword(String phoneNumber, String newPassword) throws BadRequestException;
    void SendAccount(String phoneNumber, User userAccount);
}
