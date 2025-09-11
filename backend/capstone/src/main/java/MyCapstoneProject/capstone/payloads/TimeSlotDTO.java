package MyCapstoneProject.capstone.payloads;

import java.time.LocalTime;

public record TimeSlotDTO(Long id, LocalTime startTime, LocalTime endTime, double price) {
}
