package MyCapstoneProject.capstone.payloads;

import java.time.LocalDate;

public record ReservationDTO(Long id, Long roomId, Long userId, LocalDate date, Long timeSlotId) {
}
