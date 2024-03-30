package org.jahr.backend.inspection.controller;

import lombok.RequiredArgsConstructor;

import org.jahr.backend.inspection.DTO.InspectionDTO;
import org.jahr.backend.inspection.DTO.InspectionListDTO;
import org.jahr.backend.inspection.DTO.InspectionResponseDTO;

import org.jahr.backend.inspection.service.InspectionService;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;



@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/inspections")
public class InspectionController {


    private final InspectionService service;
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public InspectionListDTO getInspections(){
        return InspectionListDTO.fromInspections(service.getInspections());
    }
    @PostMapping("/new-inspection")
    @ResponseStatus(HttpStatus.OK)
    public InspectionResponseDTO createInspection(){
        return InspectionResponseDTO.toInspectionResponseDTO(service.createInspection());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public InspectionListDTO updateInspection(@RequestBody InspectionDTO inspection){
        service.updateInspection(inspection);
        return InspectionListDTO.fromInspections(service.getInspections());
    }

    @PutMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public InspectionResponseDTO updateInspection(@PathVariable int id){
        return InspectionResponseDTO.toInspectionResponseDTO(service.updateInspection(id));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public InspectionListDTO deleteInspection(@PathVariable int id){
        return InspectionListDTO.fromInspections(service.deleteInspection(id));
    }
}
