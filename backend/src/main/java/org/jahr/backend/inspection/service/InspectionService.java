package org.jahr.backend.inspection.service;

import lombok.RequiredArgsConstructor;
import org.jahr.backend.Email;
import org.jahr.backend.area.exception.AreaNotFoundException;
import org.jahr.backend.area.model.Area;
import org.jahr.backend.area.repository.AreaRepository;
import org.jahr.backend.inspection.DTO.InspectionDTO;
import org.jahr.backend.inspection.exception.InspectionNotFoundException;
import org.jahr.backend.inspection.model.Inspection;
import org.jahr.backend.inspection.repository.InspectionRepository;
import org.jahr.backend.user.exception.UserNotFoundException;
import org.jahr.backend.user.model.AppUser;
import org.jahr.backend.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InspectionService {

    private final InspectionRepository repo;
    private final UserRepository userRepository;
    private final AreaRepository areaRepository;

    public List<Inspection> getInspections() {
        return repo.findAll();
    }

    public Inspection createInspection() {
        AppUser user = userRepository.findById(1)
                .orElseThrow(() -> new UserNotFoundException("User not found!"));
        Area area = areaRepository.findById(2)
                .orElseThrow(() -> new AreaNotFoundException("Area not found"));
        Inspection inspection = new Inspection(null, null, false, null, area, user);
        repo.save(inspection);
        return inspection;
    }

    public void updateInspection(InspectionDTO inspection) throws MessagingException {
        Inspection findInspection = repo.findById(inspection.id())
                .orElseThrow(() -> new InspectionNotFoundException("Inspection not found."));
        findInspection.setArea(inspection.area());
        findInspection.setDate(inspection.date());
        findInspection.setReportedTo(inspection.email());
        findInspection.setSubmitted(inspection.isSubmitted());
        findInspection.setDescription(inspection.description());
        var report = inspection.date() + inspection.description();
        repo.save(findInspection);
        if (inspection.isSubmitted()) {
            try {
                Email mail = new Email();
                mail.setUpServerProperties();
                mail.draftEmail(inspection.email(), report, inspection.id().toString());
                mail.sendEmail();
            } catch (IOException e) {
                throw new RuntimeException("Error at email");
            }
        }
    }

    public List<Inspection> deleteInspection(int id) {
        Inspection inspection = repo.findById(id)
                .orElseThrow(() -> new InspectionNotFoundException("Inspection was not found."));
        repo.delete(inspection);
        return repo.findAll();
    }

    public Inspection updateInspection(int id) {
//       Inspection inspection = repo.findById(id)
//               .orElseThrow(() -> new InspectionNotFoundException("Inspection was not found."));
//       return inspection;
        return null;
    }
}
