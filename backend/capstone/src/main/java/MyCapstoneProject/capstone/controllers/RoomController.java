package MyCapstoneProject.capstone.controllers;

import MyCapstoneProject.capstone.enums.OrthopedicBed;
import MyCapstoneProject.capstone.payloads.NewRoomDTO;
import MyCapstoneProject.capstone.payloads.RoomDTO;
import MyCapstoneProject.capstone.services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('ADMIN')")
    public RoomDTO createRoom(@RequestBody @Validated NewRoomDTO request) {
        return roomService.createRoom(request.nameRoom(), request.orthopedicBed());
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<RoomDTO> getAllRooms() {
        return roomService.getAllRooms();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public RoomDTO getRoom(@PathVariable Long id) {
        return roomService.getRoomByIdDTO(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
    }

    @GetMapping("/search")
    @ResponseStatus(HttpStatus.OK)
    public List<RoomDTO> searchRooms(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) OrthopedicBed bed
    ) {
        if (name != null && bed != null) {
            return roomService.searchByNameAndBed(name, bed);
        } else if (name != null) {
            return roomService.searchRoomsByName(name);
        } else if (bed != null) {
            return roomService.getRoomsByOrthopedicBed(bed);
        } else {
            return roomService.getAllRooms();
        }
    }
}
