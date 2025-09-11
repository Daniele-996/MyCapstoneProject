package MyCapstoneProject.capstone.services;

import MyCapstoneProject.capstone.entities.TimeSlot;
import MyCapstoneProject.capstone.exceptions.NotFoundException;
import MyCapstoneProject.capstone.repositories.TimeSlotRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TimeSlotService {
    @Autowired
    private TimeSlotRepo timeSlotRepo;

    public List<TimeSlot> getAllTimeSlot() {
        return timeSlotRepo.findAll();
    }

    public TimeSlot getById(Long id) {
        return timeSlotRepo.findById(id).orElseThrow(() -> new NotFoundException("Lo Slot non è stato trovato!!"));
    }
}
