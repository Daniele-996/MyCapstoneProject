package MyCapstoneProject.capstone.repositories;

import MyCapstoneProject.capstone.entities.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepo extends JpaRepository<Room, Long> {
}
