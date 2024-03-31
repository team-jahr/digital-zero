package org.jahr.backend.inspection.DTO;

import org.jahr.backend.area.model.Area;
import org.jahr.backend.inspection.model.Inspection;
import org.jahr.backend.location.model.Location;
import org.jahr.backend.user.model.AppUser;

import java.time.LocalDateTime;


public record InspectionDTO(Integer id,
                            String description,
                            boolean isSubmitted,
                            LocalDateTime date,
                            Area area,
                            Location location,
                            String email,
                            AppUser user
) {


    public static InspectionDTO fromInspection(Inspection inspection) {
        return new InspectionDTO(
                inspection.getId(),
                inspection.getDescription(),
                inspection.isSubmitted(),
                inspection.getDate(),
                inspection.getArea(),
                inspection.getArea().getLocation(),
                inspection.getReportedTo(),
                inspection.getAppUser()
        );
    }

    public static Inspection toInspection(InspectionDTO dto) {
        return new Inspection(
                dto.description(),
                dto.date(),
                dto.isSubmitted(),
                dto.email(),
                dto.area(),
                dto.user()
        );
    }
}
