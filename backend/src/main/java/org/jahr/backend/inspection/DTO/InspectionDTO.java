package org.jahr.backend.inspection.DTO;

import org.jahr.backend.inspection.model.Inspection;

public record InspectionDTO(String description) {

    // Temporary for testing deployment
    public static InspectionDTO fromInspection(Inspection inspection) {
        return new InspectionDTO(inspection.getDescription());
    }

    public static Inspection toInspection(InspectionDTO dto) {
        return null;
    }
}
