package MyCapstoneProject.capstone.services;

import MyCapstoneProject.capstone.entities.Reservation;
import MyCapstoneProject.capstone.entities.Room;
import MyCapstoneProject.capstone.entities.TimeSlot;
import MyCapstoneProject.capstone.entities.User;
import MyCapstoneProject.capstone.exceptions.NotFoundException;
import MyCapstoneProject.capstone.repositories.ReservationRepo;
import MyCapstoneProject.capstone.repositories.RoomRepo;
import MyCapstoneProject.capstone.repositories.TimeSlotRepo;
import MyCapstoneProject.capstone.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepo reservationRepo;
    @Autowired
    private RoomRepo roomRepo;
    @Autowired
    private TimeSlotRepo timeSlotRepo;
    @Autowired
    private UserRepo userRepo;

    public Reservation createNewReservation(Long roomId, Long userId, LocalDate date, Long timeSlotId) {
        Room room = roomRepo.findById(roomId).orElseThrow(() -> new NotFoundException("Stanza non trovata!!"));
        User user = userRepo.findById(userId).orElseThrow(() -> new NotFoundException("Utente non trovato!!"));
        TimeSlot timeSlot = timeSlotRepo.findById(timeSlotId).orElseThrow(() -> new NotFoundException("Orario non trovato!"));
        boolean exists = reservationRepo.existsByRoomAndDateAndTimeSlot(room, date, timeSlot);
        if (exists) {
            throw new RuntimeException("Questo orario non è disponibile per questa data!!");
        }
        Reservation reservation = new Reservation(room, user, date, timeSlot);
        return reservationRepo.save(reservation);
    }

    public List<Reservation> getAllReservation() {
        return reservationRepo.findAll();
    }

    public Reservation getReservationById(Long id) {
        return reservationRepo.findById(id).orElseThrow(() -> new NotFoundException("Prenotazione non trovata!!"));
    }

    public void deleteReservation(Long id) {
        reservationRepo.deleteById(id);
    }
}
