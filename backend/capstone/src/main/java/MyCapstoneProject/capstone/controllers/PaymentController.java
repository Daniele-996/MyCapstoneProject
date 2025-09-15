package MyCapstoneProject.capstone.controllers;

import MyCapstoneProject.capstone.entities.Payment;
import MyCapstoneProject.capstone.enums.StatusPayment;
import MyCapstoneProject.capstone.payloads.NewPaymentDTO;
import MyCapstoneProject.capstone.payloads.PaymentDTO;
import MyCapstoneProject.capstone.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    private PaymentDTO mapToDTO(Payment payment) {
        return new PaymentDTO(
                payment.getId(), payment.getUser().getId(), payment.getUser().getEmail(), payment.getReservation().getId(), payment.getReservation().getRoom().getNameRoom(), payment.getAmount(), payment.getStatusPayment()
        );
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('ADMIN')")
    public PaymentDTO createPayment(@RequestBody @Validated NewPaymentDTO request) {
        Payment payment = paymentService.createPayment(request);
        return mapToDTO(payment);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<PaymentDTO> getAllPayments() {
        return paymentService.getAllPayments().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('ADMIN')")
    public PaymentDTO getPayment(@PathVariable Long id) {
        return mapToDTO(paymentService.getPaymentById(id));
    }

    @PutMapping("/{id}/status")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('ADMIN')")
    public PaymentDTO updatePaymentStatus(@PathVariable Long id,
                                          @RequestParam StatusPayment status) {
        Payment payment = paymentService.updatePaymentStatus(id, status);
        return mapToDTO(payment);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
    }

    @GetMapping("/search")
    @ResponseStatus(HttpStatus.OK)
    public List<Payment> searchPayments(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) StatusPayment status
    ) {
        if (userId != null && status != null) {
            return paymentService.getPaymentsByUserAndStatus(userId, status);
        } else if (userId != null) {
            return paymentService.getPaymentsByUser(userId);
        } else if (status != null) {
            return paymentService.getPaymentsByStatus(status);
        } else {
            return paymentService.getAllPayments();
        }
    }

}
