package MyCapstoneProject.capstone.payloads;

import MyCapstoneProject.capstone.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record AdminUpdateDTO(
        @Size(min = 3, max = 30, message = "Il nome deve essere di lunghezza compresa tre 3 e 30")
        String firstName,
        @Size(min = 3, max = 30)
        String lastName,
        @Email(message = "Controllare che il formato dell'email sia corretto!!")
        String email,
        @Size(min = 6)
        @Pattern(regexp = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$\n", message = "La password deve contenere almeno : 1 carattere minuscolo, 1 carattere maiuscolo, 1 carattere speciale ed 1 numero!")
        String password,
        String phone, Role role) {
}
