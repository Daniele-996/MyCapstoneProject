package MyCapstoneProject.capstone.exceptions;

public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(String message) {
        super("Problemi con il token! Effettuare di nuovo il login!");
    }
}
