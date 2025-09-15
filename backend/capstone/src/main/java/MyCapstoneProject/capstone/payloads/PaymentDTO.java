package MyCapstoneProject.capstone.payloads;

import MyCapstoneProject.capstone.enums.StatusPayment;

public record PaymentDTO(
        Long id,
        Long userId,
        String userEmail,
        Long reservationId,
        String roomName,
        double amount,
        StatusPayment statusPayment
) {
}
