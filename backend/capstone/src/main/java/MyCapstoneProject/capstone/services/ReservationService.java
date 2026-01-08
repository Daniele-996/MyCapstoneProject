package MyCapstoneProject.capstone.services;

import MyCapstoneProject.capstone.entities.*;
import MyCapstoneProject.capstone.enums.StatusPayment;
import MyCapstoneProject.capstone.exceptions.BadRequestException;
import MyCapstoneProject.capstone.exceptions.NotFoundException;
import MyCapstoneProject.capstone.payloads.ReservationDTO;
import MyCapstoneProject.capstone.repositories.*;
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
    @Autowired
    private PaymentRepo paymentRepo;

    private ReservationDTO mapToDTO(Reservation reservation) {
        return new ReservationDTO(
                reservation.getId(),
                reservation.getRoom().getId(),
                reservation.getUser().getId(),
                reservation.getDate(),
                reservation.getTimeSlot().getId(),
                reservation.getPayment().getAmount()
        );
    }

    public ReservationDTO createNewReservation(Long roomId, Long userId, LocalDate date, Long timeSlotId) {
        Room room = roomRepo.findById(roomId)
                .orElseThrow(() -> new NotFoundException("Stanza non trovata!!"));
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException("Utente non trovato!!"));
        TimeSlot timeSlot = timeSlotRepo.findById(timeSlotId)
                .orElseThrow(() -> new NotFoundException("Orario non trovato!!"));

        if (!room.getTimeSlots().contains(timeSlot)) {
            throw new BadRequestException("Questo orario non appartiene alla stanza selezionata!!");
        }

        LocalDate today = LocalDate.now();
        LocalDate limit = today.plusMonths(2);
        if (date.isBefore(today)) {
            throw new BadRequestException("La data selezionata è già passata!");
        }
        if (date.isAfter(limit)) {
            throw new BadRequestException("Non è possibile prenotare oltre 2 mesi dalla data odierna!");
        }

        boolean exists = reservationRepo.existsByRoomAndDateAndTimeSlot(room, date, timeSlot);
        if (exists) {
            throw new BadRequestException("Questo orario non è disponibile per questa data!!");
        }

        Reservation reservation = new Reservation(room, user, date, timeSlot);
        double amount = timeSlot.getPrice();
        Payment payment = new Payment(user, reservation, amount, StatusPayment.NOT_PAID);
        reservation.setPayment(payment);
        Reservation saved = reservationRepo.save(reservation);

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
                .map(this::mapToDTO)
                .toList();
    }
}
