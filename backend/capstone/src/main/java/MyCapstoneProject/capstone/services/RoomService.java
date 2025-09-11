package MyCapstoneProject.capstone.services;

import MyCapstoneProject.capstone.entities.Room;
import MyCapstoneProject.capstone.entities.TimeSlot;
import MyCapstoneProject.capstone.enums.OrthopedicBed;
import MyCapstoneProject.capstone.exceptions.NotFoundException;
import MyCapstoneProject.capstone.repositories.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;

@Service
public class RoomService {
    @Autowired
    private RoomRepo roomRepo;

    public Room createRoom(String name, OrthopedicBed bed) {
        Room room = new Room(name, bed);
        double price = 10.0;
        LocalTime start = LocalTime.of(8, 0);
        for (int i = 0; i < 14; i++) {
            TimeSlot slot = new TimeSlot(start.plusHours(i), start.plusHours(i + 1), price);
            slot.setRoom(room);
            room.getTimeSlots().add(slot);
        }
        return roomRepo.save(room);
    }

    public List<Room> getAllRooms() {
        return roomRepo.findAll();
    }

    public Room getRoomById(Long id) {
        return roomRepo.findById(id).orElseThrow(() -> new NotFoundException("Stanza non trovata!!"));
    }

    public void deleteRoom(Long id) {
    }
}
