package MyCapstoneProject.capstone.services;

import MyCapstoneProject.capstone.entities.Payment;
import MyCapstoneProject.capstone.entities.Reservation;
import MyCapstoneProject.capstone.entities.User;
import MyCapstoneProject.capstone.enums.StatusPayment;
import MyCapstoneProject.capstone.exceptions.NotFoundException;
import MyCapstoneProject.capstone.payloads.NewPaymentDTO;
import MyCapstoneProject.capstone.repositories.PaymentRepo;
import MyCapstoneProject.capstone.repositories.ReservationRepo;
import MyCapstoneProject.capstone.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepo paymentRepo;
    @Autowired
    private UserRepo userRepository;
    @Autowired
    private ReservationRepo reservationRepository;

    public Payment createPayment(NewPaymentDTO dto) {
        User user = userRepository.findById(dto.userId())
                .orElseThrow(() -> new NotFoundException("Utente non trovato con id " + dto.userId()));

        Reservation reservation = reservationRepository.findById(dto.reservationId())
                .orElseThrow(() -> new NotFoundException("Prenotazione non trovata con id " + dto.reservationId()));

        Payment payment = new Payment(user, reservation, dto.amount(), StatusPayment.NOT_PAID);
        return paymentRepo.save(payment);
    }

    public List<Payment> getAllPayments() {
        return paymentRepo.findAll();
    }

    public Payment getPaymentById(Long id) {
        return paymentRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Pagamento non trovato con id " + id));
    }

    public Payment updatePaymentStatus(Long id, StatusPayment status) {
        Payment payment = this.getPaymentById(id);
        payment.setStatusPayment(status);
        return paymentRepo.save(payment);
    }

    public void deletePayment(Long id) {
        if (!paymentRepo.existsById(id)) {
            throw new NotFoundException("Pagamento non trovato con id " + id);
        }
        paymentRepo.deleteById(id);
    }

    public List<Payment> getPaymentsByUser(Long userId) {
        return paymentRepo.findByUserId(userId);
    }

    public Payment getPaymentByReservation(Long reservationId) {
        return paymentRepo.findByReservationId(reservationId)
                .orElseThrow(() -> new NotFoundException("Pagamento non trovato per questa prenotazione"));
    }

    public List<Payment> getPaymentsByStatus(StatusPayment status) {
        return paymentRepo.findByStatusPayment(status);
    }

    public List<Payment> getPaymentsByUserAndStatus(Long userId, StatusPayment status) {
        return paymentRepo.findByUserIdAndStatusPayment(userId, status);
    }
}
