package MyCapstoneProject.capstone.payloads;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record NewPaymentDTO(
        @NotNull(message = "Indicare l'ID dell'utente!") Long userId,
        @NotNull(message = "Indicare l'ID della prenotazione!") Long reservationId,
        @Min(value = 0, message = "L'importo deve essere positivo!") double amount
) {
}
