package MyCapstoneProject.capstone.repositories;

import MyCapstoneProject.capstone.entities.Payment;
import MyCapstoneProject.capstone.enums.StatusPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepo extends JpaRepository<Payment, Long> {

    List<Payment> findByUserId(Long userId);

    Optional<Payment> findByReservationId(Long reservationId);

    List<Payment> findByStatusPayment(StatusPayment statusPayment);

    List<Payment> findByUserIdAndStatusPayment(Long userId, StatusPayment statusPayment);
}
