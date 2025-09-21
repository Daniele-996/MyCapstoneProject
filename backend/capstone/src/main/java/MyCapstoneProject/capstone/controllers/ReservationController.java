package MyCapstoneProject.capstone.controllers;

import MyCapstoneProject.capstone.payloads.NewReservationDTO;
import MyCapstoneProject.capstone.payloads.ReservationDTO;
import MyCapstoneProject.capstone.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/reservations")
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ReservationDTO createReservation(@RequestBody @Validated NewReservationDTO request) {
        return reservationService.createNewReservation(
                request.roomId(),
                request.userId(),
                LocalDate.parse(request.date()),
                request.timeSlotId()
        );
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ReservationDTO> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ReservationDTO getReservation(@PathVariable Long id) {
        return reservationService.getReservationById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
    }

    @GetMapping("/search")
    @ResponseStatus(HttpStatus.OK)
    public List<ReservationDTO> searchReservations(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) Long roomId,
            @RequestParam(required = false) String date,
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to
    ) {
        if (roomId != null && from != null && to != null) {
            return reservationService.findByRoomAndDateBetween(
                    roomId,
                    LocalDate.parse(from),
                    LocalDate.parse(to)
            );
        } else if (userId != null && roomId != null && date != null) {
            return reservationService.findByUserAndRoomAndDate(userId, roomId, LocalDate.parse(date));
        } else if (userId != null && roomId != null) {
            return reservationService.findByUserAndRoom(userId, roomId);
        } else if (userId != null && date != null) {
            return reservationService.findByUserAndDate(userId, LocalDate.parse(date));
        } else if (roomId != null && date != null) {
            return reservationService.findByRoomAndDate(roomId, LocalDate.parse(date));
        } else if (userId != null) {
            return reservationService.findByUser(userId);
        } else if (date != null) {
            return reservationService.findByDate(LocalDate.parse(date));
        } else {
            return reservationService.getAllReservations();
        }
    }
}
