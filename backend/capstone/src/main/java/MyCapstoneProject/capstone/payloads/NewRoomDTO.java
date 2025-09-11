package MyCapstoneProject.capstone.payloads;

import MyCapstoneProject.capstone.enums.OrthopedicBed;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record NewRoomDTO(@NotBlank(message = "Inserire il nome della stanza!") String nameRoom,
                         @NotNull(message = "Indicare la richiesta per il letto ortopedico!")
                         OrthopedicBed orthopedicBed) {
}
