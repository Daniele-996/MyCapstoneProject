package MyCapstoneProject.capstone.entities;

import MyCapstoneProject.capstone.enums.OrthopedicBed;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "rooms")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "name_room")
    private String nameRoom;
    @Enumerated(EnumType.STRING)
    @Column(name = "orthopedic_bed")
    private OrthopedicBed orthopedicBed;
    @OneToMany(mappedBy = "room", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<TimeSlot> timeSlots = new ArrayList<>();

    public Room() {
    }

    public Room(String nameRoom, OrthopedicBed orthopedicBed) {
        this.nameRoom = nameRoom;
        this.orthopedicBed = orthopedicBed;
    }

    public String getNameRoom() {
        return nameRoom;
    }

    public void setNameRoom(String nameRoom) {
        this.nameRoom = nameRoom;
    }

    public OrthopedicBed getOrthopedicBed() {
        return orthopedicBed;
    }

    public void setOrthopedicBed(OrthopedicBed orthopedicBed) {
        this.orthopedicBed = orthopedicBed;
    }

    public long getId() {
        return id;
    }

    public List<TimeSlot> getTimeSlots() {
        return timeSlots;
    }

    public void setTimeSlots(List<TimeSlot> timeSlots) {
        this.timeSlots = timeSlots;
    }
}
