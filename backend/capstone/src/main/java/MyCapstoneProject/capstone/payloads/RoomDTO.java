package MyCapstoneProject.capstone.payloads;


import java.util.List;

public record RoomDTO(Long id, String nameRoom, String orthopedicBed, List<TimeSlotDTO> timeSlots) {
}
