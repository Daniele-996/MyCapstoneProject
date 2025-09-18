package MyCapstoneProject.capstone.services;

import MyCapstoneProject.capstone.entities.Room;
import MyCapstoneProject.capstone.entities.TimeSlot;
import MyCapstoneProject.capstone.enums.OrthopedicBed;
import MyCapstoneProject.capstone.exceptions.NotFoundException;
import MyCapstoneProject.capstone.payloads.RoomDTO;
import MyCapstoneProject.capstone.payloads.TimeSlotDTO;
import MyCapstoneProject.capstone.repositories.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepo roomRepo;

    public RoomDTO createRoom(String name, OrthopedicBed bed) {
        Room room = new Room(name, bed);
        double price = 10.0;
        LocalTime start = LocalTime.of(8, 0);
        for (int i = 0; i < 14; i++) {
            TimeSlot slot = new TimeSlot(start.plusHours(i), start.plusHours(i + 1), price);
            slot.setRoom(room);
            room.getTimeSlots().add(slot);
        }
        Room saved = roomRepo.save(room);
        return convertToDTO(saved);
    }

    public List<RoomDTO> getAllRooms() {
        return roomRepo.findAll().stream()
                .map(this::convertToDTO)
                .toList();
    }

    public RoomDTO getRoomByIdDTO(Long id) {
        Room room = roomRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Stanza non trovata!!"));
        return convertToDTO(room);
    }

    public void deleteRoom(Long id) {
        roomRepo.deleteById(id);
    }

    public List<RoomDTO> getRoomsByOrthopedicBed(OrthopedicBed bed) {
        return roomRepo.findByOrthopedicBed(bed).stream()
                .map(this::convertToDTO)
                .toList();
    }

    public List<RoomDTO> searchRoomsByName(String query) {
        return roomRepo.findByNameRoomContainingIgnoreCase(query).stream()
                .map(this::convertToDTO)
                .toList();
    }

    public List<RoomDTO> searchByNameAndBed(String name, OrthopedicBed bed) {
        return roomRepo.findByNameRoomContainingIgnoreCaseAndOrthopedicBed(name, bed).stream()
                .map(this::convertToDTO)
                .toList();
    }

    private RoomDTO convertToDTO(Room room) {
        List<TimeSlotDTO> timeSlots = room.getTimeSlots().stream()
                .map(ts -> new TimeSlotDTO(
                        ts.getId(),
                        ts.getStartTime(),
                        ts.getEndTime(),
                        ts.getPrice()
                ))
                .toList();
        return new RoomDTO(room.getId(), room.getNameRoom(), room.getOrthopedicBed().toString(), timeSlots);
    }
}
