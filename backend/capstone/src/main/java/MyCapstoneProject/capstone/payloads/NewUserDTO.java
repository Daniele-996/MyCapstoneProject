package MyCapstoneProject.capstone.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record NewUserDTO(
        @NotEmpty(message = "Il nome è obbligatorio!!")
        @Size(min = 3, max = 30, message = "Il nome deve essere di lunghezza compresa tre 3 e 30")
        String firstName,
        @NotEmpty(message = "il cognome è obbligatorio!!")
        @Size(min = 3, max = 30)
        String lastName,
        @NotEmpty(message = "L'indirizzo email è obbligatorio!!")
        @Email(message = "Controllare che il formato dell'email sia corretto!!")
        String email,
        @NotEmpty(message = "La password è obbligatoria!!")
        @Size(min = 6)
        @Pattern(regexp = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$", message = "La password deve contenere almeno : 1 carattere minuscolo, 1 carattere maiuscolo, 1 carattere speciale ed 1 numero!")
        String password,
        @NotEmpty(message = "Inserisci il numero di telefono!")
        String phone) {
}
