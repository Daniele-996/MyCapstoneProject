package MyCapstoneProject.capstone.controllers;

import MyCapstoneProject.capstone.entities.Room;
import MyCapstoneProject.capstone.payloads.NewRoomDTO;
import MyCapstoneProject.capstone.payloads.RoomDTO;
import MyCapstoneProject.capstone.services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rooms")
public class RoomController {
    @Autowired
    private RoomService roomService;

    private RoomDTO mapToDTO(Room room) {
        return new RoomDTO(room.getNameRoom(), room.getOrthopedicBed()
        );
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RoomDTO createRoom(@RequestBody @Validated NewRoomDTO request) {
        Room room = roomService.createRoom(request.nameRoom(), request.orthopedicBed());
        return mapToDTO(room);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<RoomDTO> getAllRooms() {
        return roomService.getAllRooms().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public RoomDTO getRoom(@PathVariable Long id) {
        return mapToDTO(roomService.getRoomById(id));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
    }
}
