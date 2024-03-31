package org.jahr.backend.inspection.DTO;

import org.jahr.backend.area.model.Area;
import org.jahr.backend.inspection.model.Inspection;
import org.jahr.backend.inspectionIssue.model.InspectionIssue;
import org.jahr.backend.location.model.Location;

import java.time.LocalDateTime;
import java.util.List;

public record InspectionResponseDTO(Integer id,
                                    String description,
                                    boolean isSubmitted,
                                    LocalDateTime date,
                                    Area area,
                                    Location location,
                                    List<InspectionIssue> inspectionList,
                                    String email) {
    public static InspectionResponseDTO toInspectionResponseDTO(Inspection inspection) {
        return new InspectionResponseDTO(
                inspection.getId(),
                inspection.getDescription(),
                inspection.isSubmitted(),
                inspection.getDate(),
                new Area(inspection.getArea().getName(),inspection.getArea().getLocation()),
                inspection.getArea().getLocation(),
                inspection.getInspectionIssues(),
                inspection.getReportedTo());
    }
}
