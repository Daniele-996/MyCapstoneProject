package MyCapstoneProject.capstone.repositories;

import MyCapstoneProject.capstone.entities.Reservation;
import MyCapstoneProject.capstone.entities.Room;
import MyCapstoneProject.capstone.entities.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepo extends JpaRepository<Reservation, Long> {
    boolean existsByRoomAndDateAndTimeSlot(Room room, LocalDate date, TimeSlot timeSlot);

    List<Reservation> findByUserId(Long userId);

    List<Reservation> findByRoomId(Long roomId);

    List<Reservation> findByDate(LocalDate date);

    List<Reservation> findByUserIdAndRoomId(Long userId, Long roomId);

    List<Reservation> findByUserIdAndDate(Long userId, LocalDate date);

    List<Reservation> findByRoomIdAndDate(Long roomId, LocalDate date);

    List<Reservation> findByUserIdAndRoomIdAndDate(Long userId, Long roomId, LocalDate date);

    List<Reservation> findByRoomIdAndDateBetween(Long roomId, LocalDate from, LocalDate to);
}
