package org.jahr.backend.inspection.DTO;

import org.jahr.backend.inspection.model.Inspection;

import java.util.ArrayList;
import java.util.List;

public record InspectionListDTO(List<InspectionDTO> inspectionDTOs) {

    public static InspectionListDTO fromInspections(List<Inspection> inspections) {
        List<InspectionDTO> dtos = new ArrayList<>();
        inspections.forEach(inspection -> dtos.add(InspectionDTO.fromInspection(inspection)));
        return new InspectionListDTO(dtos);
    }
}
