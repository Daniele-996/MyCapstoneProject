package MyCapstoneProject.capstone.entities;

import MyCapstoneProject.capstone.enums.StatusPayment;
import jakarta.persistence.*;


@Entity
@Table(name = "payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    private User user;
    @OneToOne
    private Reservation reservation;
    private double amount;
    @Enumerated(EnumType.STRING)
    private StatusPayment statusPayment;

    public Payment() {
    }

    public Payment(User user, Reservation reservation, double amount, StatusPayment statusPayment) {
        this.user = user;
        this.reservation = reservation;
        this.amount = amount;
        this.statusPayment = statusPayment;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public StatusPayment getStatusPayment() {
        return statusPayment;
    }

    public void setStatusPayment(StatusPayment statusPayment) {
        this.statusPayment = statusPayment;
    }

    public long getId() {
        return id;
    }

}
