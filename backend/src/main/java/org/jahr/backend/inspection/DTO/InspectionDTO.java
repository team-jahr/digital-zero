package org.jahr.backend.inspection.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.jahr.backend.inspection.model.Inspection;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.Date;

public record InspectionDTO(String description, boolean isDraft, LocalDateTime date, String area, String location, String email) {

    // Temporary for testing deployment
//    public static InspectionDTO fromInspection(Inspection inspection) {
//        return new InspectionDTO(inspection.getDescription(), inspection.);
//    }

    public static Inspection toInspection(InspectionDTO dto) {
        return null;
    }
}
