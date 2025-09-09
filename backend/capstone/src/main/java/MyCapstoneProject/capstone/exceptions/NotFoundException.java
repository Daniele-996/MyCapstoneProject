package MyCapstoneProject.capstone.exceptions;

public class NotFoundException extends RuntimeException {
    public NotFoundException(long id) {
        super("La risorsa con id : " + id + " non è stata trovata!");
    }

    public NotFoundException(String msg) {
        super(msg);
    }
}
