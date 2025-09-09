package MyCapstoneProject.capstone.services;

import MyCapstoneProject.capstone.entities.User;
import MyCapstoneProject.capstone.exceptions.BadRequestException;
import MyCapstoneProject.capstone.exceptions.NotFoundException;
import MyCapstoneProject.capstone.payloads.NewUserDTO;
import MyCapstoneProject.capstone.repositories.UserRepo;
import MyCapstoneProject.capstone.tools.MailgunSender;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder bcrypt;
    @Autowired
    private MailgunSender mailgunSender;

    @Value("${URL_AVATAR_DEFAULT}")
    private String defaultAvatarUrl;

    public User save(NewUserDTO payload) {
        this.userRepo.findByEmail(payload.email()).ifPresent(user -> {
            throw new BadRequestException("L'email " + user.getEmail() + " è già in uso!");
        });
        User newUser = new User(payload.firstName(), payload.lastName(), payload.email(), bcrypt.encode(payload.password()), payload.phone());
        newUser.setAvatarUrl(defaultAvatarUrl);
        User savedUser = this.userRepo.save(newUser);
        log.info("L'utente con id: " + savedUser.getId() + " è stato salvato correttamente!!");
        mailgunSender.sendRegistrationEmail(savedUser);
        return savedUser;
    }

    public Page<User> findAll(int pageNum, int pageSize, String sortBy) {
        if (pageSize > 50) pageSize = 50;
        Pageable pageable = PageRequest.of(pageNum, pageSize, Sort.by(sortBy).descending());
        return this.userRepo.findAll(pageable);
    }

    public User findById(long id) {
        return this.userRepo.findById(id).orElseThrow(() -> new NotFoundException(id));
    }

    public User findByIdAndUpdate(long id, NewUserDTO payload) {
        User found = this.findById(id);
        if (!found.getEmail().equals(payload.email()))
            this.userRepo.findByEmail(payload.email()).ifPresent(user -> {
                throw new BadRequestException("L'email " + user.getEmail() + " è già in uso!");
            });
        found.setFirstName(payload.firstName());
        found.setLastName(payload.lastName());
        found.setEmail(payload.email());
        found.setPassword(bcrypt.encode(payload.password()));
        User modifiedUser = this.userRepo.save(found);
        log.info("L'utente con id: " + found.getId() + " è stato modificato correttamente!");
        return modifiedUser;
    }

    public void findByIdAndDelete(long id) {
        User found = this.findById(id);
        this.userRepo.delete(found);
    }

    public User findByEmail(String email) {
        return this.userRepo.findByEmail(email).orElseThrow(() -> new NotFoundException("L'utente con l'email: " + email + " non è stato trovato!"));
    }


}
