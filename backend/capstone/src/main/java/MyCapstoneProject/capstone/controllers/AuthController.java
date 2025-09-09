package MyCapstoneProject.capstone.controllers;

import MyCapstoneProject.capstone.entities.User;
import MyCapstoneProject.capstone.exceptions.ValidationException;
import MyCapstoneProject.capstone.payloads.LoginDTO;
import MyCapstoneProject.capstone.payloads.LoginResponseDTO;
import MyCapstoneProject.capstone.payloads.NewUserDTO;
import MyCapstoneProject.capstone.payloads.NewUserRespDTO;
import MyCapstoneProject.capstone.services.AuthService;
import MyCapstoneProject.capstone.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginDTO body) {
        String accessToken = authService.checkCredentialsAndGenerateToken(body);
        return new LoginResponseDTO(accessToken);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public NewUserRespDTO save(@RequestBody @Validated NewUserDTO payload, BindingResult validation) {
        if (validation.hasErrors()) {
            throw new ValidationException(validation.getFieldErrors().stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        } else {
            User newUser = this.userService.save(payload);
            return new NewUserRespDTO(newUser.getId());
        }
    }
}
