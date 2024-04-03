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
import org.jahr.backend.user.exception.UserNotFoundException;
import org.jahr.backend.user.model.AppUser;
import org.jahr.backend.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.IOException;
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
        Inspection inspection = new Inspection(null, null, false, null, area, user);
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
        StringBuilder issuesList = new StringBuilder();
        Email mail = new Email();
        issuesList.append(String.format(
                "Inspection id: " + inspection.id() + "%n" + "Inspection date: " + inspection.date()
                        .format(myFormatObj) + "%n" + "Inspection description: "
                        + inspection.description() + "%n"));
        for (IssueDTO inspectionIssue : inspectionIssues) {
            issuesList.append(String.format(
                    "----------------------------------------------" + "%n" + "Title: "
                            + inspectionIssue.title() + "%n" + "Severity: "
                            + inspectionIssue.severity() + "%n" + "Description: "
                            + inspectionIssue.description() + "%n"
                            + "----------------------------------------------" + "%n"));
            blobClient.getIssueImagesByList(inspectionIssue.images(),
                                            inspectionIssue.id(),
                                            mail,
                                            inspectionIssue.title()
            );

        }
        repo.save(findInspection);
        if (inspection.isSubmitted()) {
            System.out.println("test = ");
            try {

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

    public Inspection updateInspection(int id) {
//       Inspection inspection = repo.findById(id)
//               .orElseThrow(() -> new InspectionNotFoundException("Inspection was not found."));
//       return inspection;
        return null;
    }
}
