package MyCapstoneProject.capstone.controllers;

import MyCapstoneProject.capstone.entities.TimeSlot;
import MyCapstoneProject.capstone.payloads.TimeSlotDTO;
import MyCapstoneProject.capstone.services.TimeSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/timeslots")
public class TimeSlotController {
    @Autowired
    private TimeSlotService timeSlotService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<TimeSlotDTO> getAll() {
        return timeSlotService.getAllTimeSlot().stream()
                .map(timeSlot -> new TimeSlotDTO(timeSlot.getId(), timeSlot.getStartTime(), timeSlot.getEndTime(), timeSlot.getPrice()))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public TimeSlotDTO getById(@PathVariable Long id) {
        TimeSlot timeSlot = timeSlotService.getById(id);
        return new TimeSlotDTO(timeSlot.getId(), timeSlot.getStartTime(), timeSlot.getEndTime(), timeSlot.getPrice());
    }
}
