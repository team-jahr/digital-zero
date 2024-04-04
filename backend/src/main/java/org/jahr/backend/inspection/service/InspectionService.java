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
import org.jahr.backend.inspectionIssue.model.InspectionIssue;
import org.jahr.backend.issue.DTO.IssueDTO;
import org.jahr.backend.issue.DTO.IssueListDTO;
import org.jahr.backend.issue.client.IssueBlobClient;
import org.jahr.backend.issue.model.Issue;
import org.jahr.backend.location.model.Location;
import org.jahr.backend.user.exception.UserNotFoundException;
import org.jahr.backend.user.model.AppUser;
import org.jahr.backend.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InspectionService {

    private final InspectionRepository repo;
    private final UserRepository userRepository;
    private final AreaRepository areaRepository;
    private final IssueBlobClient blobClient;

    public List<Inspection> getInspections() {
        return repo.findAll();
    }

    public Inspection getInspectionById(Integer id) {
        return repo.getReferenceById(id);
    }

    public Inspection createInspection() {
        AppUser user = userRepository.findById(1)
                .orElseThrow(() -> new UserNotFoundException("User not found!"));
        Area area = areaRepository.findById(2)
                .orElseThrow(() -> new AreaNotFoundException("Area not found"));
        Inspection inspection = new Inspection(null, LocalDateTime.now(), false, null, area, user);
        repo.save(inspection);
        return inspection;
    }

    public IssueListDTO getIssuesForForm(int id) {
        Inspection inspection = repo.findById(id)
                .orElseThrow(() -> new InspectionNotFoundException("Inspection not found."));
        List<Issue> getAllIssues =
                inspection.getInspectionIssues().stream().map(InspectionIssue::getIssue).toList();
        return IssueListDTO.fromIssues(getAllIssues);
    }

    public void updateInspection(InspectionDTO inspection) throws MessagingException {
        Inspection findInspection = repo.findById(inspection.id())
                .orElseThrow(() -> new InspectionNotFoundException("Inspection not found."));
        findInspection.setArea(inspection.area());
        findInspection.setDate(inspection.date());
        findInspection.setReportedTo(InspectionDTO.joinEmail(inspection.reportedTo()));
        findInspection.setSubmitted(inspection.isSubmitted());
        findInspection.setDescription(inspection.description());
        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        List<IssueDTO> inspectionIssues = getIssuesForForm(inspection.id()).issues();

        repo.save(findInspection);
        if (inspection.isSubmitted()) {
            System.out.println("test = ");
            try {
                StringBuilder issuesList = new StringBuilder();
                Email mail = new Email();
                issuesList.append(String.format("<div><h3>Inspection nr <span style=\"color:#60A5FA;\">%s</span></h3></div>", inspection.id()));
                issuesList.append(String.format("<div><h3 style=\"color:black;\">Date: %s </h3>", inspection.date()
                        .format(myFormatObj)));
                issuesList.append(String.format("<div><h3>Description: %s</h3></div>", inspection.description()));
                issuesList.append(String.format("<div><h3>Inspector: Johan Hedberg</h3></div>"));
                issuesList.append(String.format("<div><h3>List of issues:</h3></div>"));
                for (IssueDTO inspectionIssue : inspectionIssues) {
                    issuesList.append(String.format(
                            "<div style=\"width: 200px; border-bottom: 1px solid black; height:2px\"></div></br>" +
                                    "<div><h3>Title: <span style=\"color:#60A5FA;\">%s</span><h3></div>" +
                                    "<div><h3>Severity: <span style=\"color:#60A5FA;\">%s</span><h3></div>" +
                                    "<div><h3>Description: <span style=\"color:#60A5FA;\">%s</span></h3></div></br>",
                            inspectionIssue.title(), inspectionIssue.severity(), inspectionIssue.description()));
                    blobClient.getIssueImagesByList(inspectionIssue.images(),
                            inspectionIssue.id(),
                            mail,
                            inspectionIssue.title()
                    );
                }
                mail.setUpServerProperties();
                mail.draftEmail(InspectionDTO.joinEmail(inspection.reportedTo()),
                        issuesList.toString(),
                        inspection.id().toString()
                );
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


    public List<Inspection> getIssuesSortedByLocation(Integer location, boolean submitted, String date) {
        if (location != null && date != null) {
            return getInspections().stream().filter(el -> {
                return el.getArea().getLocation().getId() == location &&
                        el.getDate().toLocalDate().equals(parsedDate(date)) && el.isSubmitted() == submitted;
            }).toList();
        } else if (location == null && date != null) {

            return getInspections().stream().filter(el -> {
                        System.out.println("el.getDate.toLocalDate() = " + el.getDate().toLocalDate());
                        return el.getDate().toLocalDate().equals(parsedDate(date)) && el.isSubmitted() == submitted;
                    }
            ).toList();
        } else if (location != null && date == null) {
            return getInspections().stream().filter(el -> el.isSubmitted() == submitted && el.getArea().getLocation().getId() == location).toList();
        } else {
            return getInspections().stream().filter(el -> el.isSubmitted() == submitted).toList();
        }
    }

    public LocalDate parsedDate(String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'.000Z'")
                .withZone(ZoneId.of("UTC"));
        LocalDateTime dateParsed = LocalDateTime.parse(date, formatter);
        System.out.println("dateParsed = " + dateParsed.toLocalDate());
        return dateParsed.toLocalDate();
    }
}
