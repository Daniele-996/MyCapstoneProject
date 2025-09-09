package MyCapstoneProject.capstone.exceptions;

import MyCapstoneProject.capstone.payloads.ErrorsDTO;
import MyCapstoneProject.capstone.payloads.ErrorsWithListDTO;
import org.springframework.http.HttpStatus;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionsHandler {
    @ExceptionHandler(ValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorsWithListDTO handleValidationErrors(ValidationException exception) {
        return new ErrorsWithListDTO(exception.getMessage(), LocalDateTime.now(), exception.getErrorMessages());
    }

    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorsDTO handleBadRequest(BadRequestException exception) {
        return new ErrorsDTO(exception.getMessage(), LocalDateTime.now());
    }

    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorsDTO handleUnauthorized(UnauthorizedException exception) {
        return new ErrorsDTO(exception.getMessage(), LocalDateTime.now());
    }

    @ExceptionHandler(AuthorizationDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorsDTO handleForbidden(AuthorizationDeniedException exception) {
        return new ErrorsDTO("Non sei autorizzato ad accedere!", LocalDateTime.now());
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorsDTO handleNotFound(NotFoundException exception) {
        return new ErrorsDTO(exception.getMessage(), LocalDateTime.now());
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorsDTO handleServerError(Exception exception) {
        exception.printStackTrace();
        return new ErrorsDTO("L'errore non è specifico, stiamo lavorando per risolvere al più presto! Ci scusiamo per il disagio!", LocalDateTime.now());
    }
}
