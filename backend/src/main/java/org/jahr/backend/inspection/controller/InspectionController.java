package org.jahr.backend.inspection.controller;

import org.jahr.backend.inspection.DTO.InspectionDTO;
import org.jahr.backend.inspection.DTO.InspectionListDTO;
import org.jahr.backend.inspection.DTO.InspectionResponseDTO;
import org.jahr.backend.inspection.model.Inspection;
import org.jahr.backend.inspection.service.InspectionService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/inspections")
public class InspectionController {
    private final InspectionService service;

    public InspectionController(InspectionService service) {
        this.service = service;
    }

    // Temporary for test of deployment

    @PostMapping("/new-inspection")
    @ResponseStatus(HttpStatus.OK)
    public InspectionResponseDTO createInspection() {
        return InspectionResponseDTO.toInspectionResponseDTO(service.createInspection());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public InspectionListDTO updateInspection(@RequestBody InspectionDTO inspection)
            throws MessagingException {
        service.updateInspection(inspection);
        return InspectionListDTO.fromInspections(service.getInspections());
    }

    @GetMapping
    public ResponseEntity<InspectionListDTO> getInspections() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        List<Inspection> inspections = service.getInspections();

        InspectionListDTO dto = InspectionListDTO.fromInspections(inspections);

        return ResponseEntity.ok().headers(headers).body(dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public InspectionListDTO deleteInspection(@PathVariable int id) {
        return InspectionListDTO.fromInspections(service.deleteInspection(id));
    }
}
