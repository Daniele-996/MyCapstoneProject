package MyCapstoneProject.capstone.repositories;

import MyCapstoneProject.capstone.entities.Reservation;
import MyCapstoneProject.capstone.entities.Room;
import MyCapstoneProject.capstone.entities.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface ReservationRepo extends JpaRepository<Reservation, Long> {
    boolean existsByRoomAndDateAndTimeSlot(Room room, LocalDate date, TimeSlot timeSlot);
}
