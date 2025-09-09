package MyCapstoneProject.capstone.services;

import MyCapstoneProject.capstone.entities.User;
import MyCapstoneProject.capstone.exceptions.UnauthorizedException;
import MyCapstoneProject.capstone.payloads.LoginDTO;
import MyCapstoneProject.capstone.tools.JWTTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserService userService;
    @Autowired
    private JWTTools jwtTools;
    @Autowired
    private PasswordEncoder bcrypt;

    public String checkCredentialsAndGenerateToken(LoginDTO body) {
        User found = this.userService.findByEmail(body.email());
        if (bcrypt.matches(body.password(), found.getPassword())) {
            String accessToken = jwtTools.createToken(found);
            return accessToken;
        } else {
            throw new UnauthorizedException("Credenziali errate!!");
        }
    }
}
