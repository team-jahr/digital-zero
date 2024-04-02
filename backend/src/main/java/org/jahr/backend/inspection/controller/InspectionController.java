package org.jahr.backend.inspection.controller;

import lombok.RequiredArgsConstructor;
import org.jahr.backend.inspection.DTO.InspectionDTO;
import org.jahr.backend.inspection.DTO.InspectionListDTO;
import org.jahr.backend.inspection.DTO.InspectionResponseDTO;
import org.jahr.backend.inspection.model.Inspection;
import org.jahr.backend.inspection.service.InspectionService;
import org.jahr.backend.issue.DTO.IssueListDTO;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/inspections")
@RequiredArgsConstructor
public class InspectionController {
    private final InspectionService service;


    @PostMapping("/new-inspection")
    @ResponseStatus(HttpStatus.OK)
    public InspectionResponseDTO createInspection() {
        return InspectionResponseDTO.toInspectionResponseDTO(service.createInspection());
    }

    @GetMapping("/{id}/issues")
    @ResponseStatus(HttpStatus.OK)
    public IssueListDTO getAllIssues(@PathVariable int id) {
        return service.getIssuesForForm(id);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public InspectionDTO getInspectionById(@PathVariable int id) {
        return InspectionDTO.fromInspection(service.getInspectionById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public InspectionListDTO updateInspection(@RequestBody InspectionDTO inspection)
            throws MessagingException, IOException {
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
