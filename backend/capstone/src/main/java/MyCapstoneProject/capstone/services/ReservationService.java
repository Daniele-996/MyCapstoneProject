package MyCapstoneProject.capstone.services;

import MyCapstoneProject.capstone.entities.Reservation;
import MyCapstoneProject.capstone.entities.Room;
import MyCapstoneProject.capstone.entities.TimeSlot;
import MyCapstoneProject.capstone.entities.User;
import MyCapstoneProject.capstone.exceptions.NotFoundException;
import MyCapstoneProject.capstone.payloads.ReservationDTO;
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

    private ReservationDTO mapToDTO(Reservation reservation) {
        return new ReservationDTO(
                reservation.getId(),
                reservation.getRoom().getId(),
                reservation.getUser().getId(),
                reservation.getDate(),
                reservation.getTimeSlot().getId()
        );
    }

    public ReservationDTO createNewReservation(Long roomId, Long userId, LocalDate date, Long timeSlotId) {
        Room room = roomRepo.findById(roomId)
                .orElseThrow(() -> new NotFoundException("Stanza non trovata!!"));
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException("Utente non trovato!!"));
        TimeSlot timeSlot = timeSlotRepo.findById(timeSlotId)
                .orElseThrow(() -> new NotFoundException("Orario non trovato!!"));

        boolean exists = reservationRepo.existsByRoomAndDateAndTimeSlot(room, date, timeSlot);
        if (exists) {
            throw new RuntimeException("Questo orario non è disponibile per questa data!!");
        }

        Reservation saved = reservationRepo.save(new Reservation(room, user, date, timeSlot));
        return mapToDTO(saved);
    }

    public List<ReservationDTO> getAllReservations() {
        return reservationRepo.findAll().stream().map(this::mapToDTO).toList();
    }

    public ReservationDTO getReservationById(Long id) {
        return reservationRepo.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new NotFoundException("Prenotazione non trovata!!"));
    }

    public void deleteReservation(Long id) {
        if (!reservationRepo.existsById(id)) {
            throw new NotFoundException("Prenotazione non trovata!!");
        }
        reservationRepo.deleteById(id);
    }

    public List<ReservationDTO> findByDate(LocalDate date) {
        return reservationRepo.findByDate(date).stream().map(this::mapToDTO).toList();
    }

    public List<ReservationDTO> findByRoomAndDate(Long roomId, LocalDate date) {
        return reservationRepo.findByRoomIdAndDate(roomId, date).stream().map(this::mapToDTO).toList();
    }

    public List<ReservationDTO> findByUser(Long userId) {
        return reservationRepo.findByUserId(userId).stream().map(this::mapToDTO).toList();
    }

    public List<ReservationDTO> findByUserAndDate(Long userId, LocalDate date) {
        return reservationRepo.findByUserIdAndDate(userId, date).stream().map(this::mapToDTO).toList();
    }

    public List<ReservationDTO> findByUserAndRoom(Long userId, Long roomId) {
        return reservationRepo.findByUserIdAndRoomId(userId, roomId).stream().map(this::mapToDTO).toList();
    }

    public List<ReservationDTO> findByUserAndRoomAndDate(Long userId, Long roomId, LocalDate date) {
        return reservationRepo.findByUserIdAndRoomIdAndDate(userId, roomId, date).stream().map(this::mapToDTO).toList();
    }

    public List<ReservationDTO> findByRoomAndDateBetween(Long roomId, LocalDate from, LocalDate to) {
        return reservationRepo
                .findByRoomIdAndDateBetween(roomId, from, to)
                .stream()
                .map(this::mapToDTO) // converte in DTO
                .toList();
    }
}
