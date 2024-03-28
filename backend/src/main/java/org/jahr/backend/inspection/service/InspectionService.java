package org.jahr.backend.inspection.service;

import org.jahr.backend.inspection.DTO.InspectionDTO;
import org.jahr.backend.inspection.model.Inspection;
import org.jahr.backend.inspection.repository.InspectionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InspectionService {

    private final InspectionRepository repo;

    public InspectionService(InspectionRepository repo) {
        this.repo = repo;
    }

    public List<Inspection> getInspections() {
        return repo.findAll();
    }

    // Full CRUD-functionality
//    public InspectionDTO createInspectionDraft(InspectionDTO inspectionDTO){
//
//    }
}
