package MyCapstoneProject.capstone.payloads;

import jakarta.validation.constraints.NotNull;

public record NewReservationDTO(
        @NotNull(message = "La stanza è obbligatoria")
        Long roomId,
        @NotNull(message = "l'utente è obbligatorio")
        Long userId,
        @NotNull(message = "La data è obbligatoria")
        String date,
        @NotNull(message = "Il time slot è obbligatorio")
        Long timeSlotId
) {
}
