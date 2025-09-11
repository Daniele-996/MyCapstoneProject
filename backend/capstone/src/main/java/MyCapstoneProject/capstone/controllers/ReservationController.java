package MyCapstoneProject.capstone.controllers;

import MyCapstoneProject.capstone.entities.Reservation;
import MyCapstoneProject.capstone.payloads.NewReservationDTO;
import MyCapstoneProject.capstone.payloads.ReservationDTO;
import MyCapstoneProject.capstone.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/reservations")
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    private ReservationDTO mapToDTO(Reservation reservation) {
        return new ReservationDTO(reservation.getId(), reservation.getRoom().getId(), reservation.getUser().getId(), reservation.getDate(), reservation.getTimeSlot().getId());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ReservationDTO createReservation(@RequestBody @Validated NewReservationDTO request) {
        Reservation reservation = reservationService.createNewReservation(request.roomId(), request.userId(), LocalDate.parse(request.date()), request.timeSlotId());
        return mapToDTO(reservation);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ReservationDTO> getAllReservation() {
        return reservationService.getAllReservation().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ReservationDTO getReservation(@PathVariable Long id) {
        return mapToDTO(reservationService.getReservationById(id));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
    }
}
