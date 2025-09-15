package MyCapstoneProject.capstone.repositories;

import MyCapstoneProject.capstone.entities.Room;
import MyCapstoneProject.capstone.enums.OrthopedicBed;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepo extends JpaRepository<Room, Long> {
    List<Room> findByOrthopedicBed(OrthopedicBed orthopedicBed);

    List<Room> findByNameRoomContainingIgnoreCase(String name);

    List<Room> findByNameRoomContainingIgnoreCaseAndOrthopedicBed(String name, OrthopedicBed bed);
}
