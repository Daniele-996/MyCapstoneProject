package MyCapstoneProject.capstone.repositories;

import MyCapstoneProject.capstone.entities.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimeSlotRepo extends JpaRepository<TimeSlot, Long> {
}
