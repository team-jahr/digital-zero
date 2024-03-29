package org.jahr.backend.inspection.service;

import org.jahr.backend.area.Area;
import org.jahr.backend.inspection.DTO.InspectionDTO;
import org.jahr.backend.inspection.model.Inspection;
import org.jahr.backend.inspection.repository.InspectionRepository;
import org.jahr.backend.location.model.Location;
import org.jahr.backend.user.model.AppUser;
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
    public InspectionDTO createInspection(InspectionDTO inspection){
        Location location = new Location(inspection.location());
        Area area = new Area(inspection.area(), location);
        System.out.println("inspection = " + inspection);        Inspection inspection1 = new Inspection(inspection.description(), inspection.date(), inspection.isDraft(), inspection.email(), area);
        repo.save(inspection1);
        return null;
    }
}
