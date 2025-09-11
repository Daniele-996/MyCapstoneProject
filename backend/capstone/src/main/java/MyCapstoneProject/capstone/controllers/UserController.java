package MyCapstoneProject.capstone.controllers;

import MyCapstoneProject.capstone.entities.User;
import MyCapstoneProject.capstone.exceptions.ValidationException;
import MyCapstoneProject.capstone.payloads.AdminUpdateDTO;
import MyCapstoneProject.capstone.payloads.NewUserDTO;
import MyCapstoneProject.capstone.payloads.NewUserRespDTO;
import MyCapstoneProject.capstone.payloads.UpdateUserDTO;
import MyCapstoneProject.capstone.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    public Page<User> findALl(@RequestParam(defaultValue = "0") int page,
                              @RequestParam(defaultValue = "10") int size,
                              @RequestParam(defaultValue = "id") String sortBy) {
        return this.userService.findAll(page, size, sortBy);
    }

    @GetMapping("/me")
    @ResponseStatus(HttpStatus.OK)
    public User getOwnProfile(@AuthenticationPrincipal User currentAuthUser) {
        return currentAuthUser;
    }

    @PutMapping("/me")
    @ResponseStatus(HttpStatus.OK)
    public User updateOwnProfile(@AuthenticationPrincipal User currentAuthUser, @RequestBody @Validated UpdateUserDTO payload) {
        return this.userService.updateOwnProfile(currentAuthUser.getId(), payload);
    }

    @DeleteMapping("/me")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOwnProfile(@AuthenticationPrincipal User currentAuthUser) {
        this.userService.findByIdAndDelete(currentAuthUser.getId());
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('ADMIN')")
    public NewUserRespDTO save(@RequestBody @Validated NewUserDTO payload, BindingResult validation) {
        if (validation.hasErrors()) {
            throw new ValidationException(validation.getFieldErrors().stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        } else {
            User newUser = this.userService.save(payload);
            return new NewUserRespDTO(newUser.getId());
        }
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public User getById(@PathVariable long id) {
        return this.userService.findById(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    public User getByIdAndUpdate(@PathVariable long id, @RequestBody AdminUpdateDTO payload) {
        return this.userService.updateUserByAdmin(id, payload);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void getByIdAndDelete(@PathVariable long id) {
        this.userService.findByIdAndDelete(id);
    }
}
