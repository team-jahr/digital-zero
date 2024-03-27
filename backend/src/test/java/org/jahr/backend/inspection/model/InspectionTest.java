package org.jahr.backend.inspection.model;

import org.jahr.backend.area.Area;
import org.jahr.backend.area.AreaRepository;
import org.jahr.backend.inspection.repository.InspectionRepository;
import org.jahr.backend.inspectionIssue.model.InspectionIssue;
import org.jahr.backend.inspectionIssue.repository.InspectionIssueRepository;
import org.jahr.backend.issue.model.Issue;
import org.jahr.backend.issue.repository.IssueRepository;
import org.jahr.backend.location.model.Location;
import org.jahr.backend.location.repository.LocationRepository;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class InspectionTest {

    @Autowired
    private InspectionRepository inspectionsRepo;

    @Autowired
    private AreaRepository areaRepo;

    @Autowired
    private IssueRepository issueRepo;

    @Autowired
    private InspectionIssueRepository inspectionIssueRepo;

    @Autowired
    private LocationRepository locationRepo;

    @Order(1)
    @Test
    void canAddInspection() {
        // Arrange
        int expected = 2;

        Location location = new Location("A location");
        locationRepo.save(location);
        
        Area area = new Area("An area", location);
        areaRepo.save(area);

        Issue issue1 = new Issue("An issue", "", "warning", "url");
        Issue issue2 = new Issue("Another issue", "", "warning", "url");
        issueRepo.save(issue1);
        issueRepo.save(issue2);


        Inspection inspection1 =
                new Inspection("An inspection", "yyyy-MM-dd hh:mm", false, null, area);
        Inspection inspection2 =
                new Inspection("Another inspection", "yyyy-MM-dd hh:mm", false, null, area);

        inspection1.addIssue(issue2);
        inspection2.addIssue(issue1);

        inspectionsRepo.save(inspection1);
        inspectionsRepo.save(inspection2);

        inspectionIssueRepo.saveAll(inspection1.getInspectionIssues());
        inspectionIssueRepo.saveAll(inspection2.getInspectionIssues());

        // Act
        int actual = inspectionsRepo.findAll().size();

        // Assert
        assertEquals(expected, actual);
    }

    @Order(2)
    @Test
    void shouldContainOneIssue() {
        int expectedSize = 1;
        String expectedValue = "Another issue";

        List<InspectionIssue> inspectionIssues = inspectionIssueRepo.findAll()
                .stream()
                .filter(el -> el.getInspection().getId() == 1)
                .toList();

        int actualSize = inspectionIssues.size();
        String actualValue = inspectionIssues.get(0).getIssue().getTitle();

        assertEquals(expectedSize, actualSize);
        assertEquals(expectedValue, actualValue);
    }
}