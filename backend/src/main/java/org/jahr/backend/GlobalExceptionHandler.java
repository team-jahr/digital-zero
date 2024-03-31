package org.jahr.backend;

import org.jahr.backend.area.exception.AreaNotFoundException;
import org.jahr.backend.inspection.exception.InspectionNotFoundException;
import org.jahr.backend.user.exception.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler({InspectionNotFoundException.class, AreaNotFoundException.class, UserNotFoundException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    private String handleEntityNotFoundException(InspectionNotFoundException exception) {
        return exception.getMessage();
    }
//    @ExceptionHandler(UserNotFoundException.class)
//    @ResponseStatus(HttpStatus.NOT_FOUND)
//    private String handleInspectionNotFoundException(UserNotFoundException exception) {
//        return exception.getMessage();
//    }
}
