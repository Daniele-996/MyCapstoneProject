package MyCapstoneProject.capstone.entities;

import MyCapstoneProject.capstone.enums.OrthopedicBed;
import jakarta.persistence.*;

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

}
