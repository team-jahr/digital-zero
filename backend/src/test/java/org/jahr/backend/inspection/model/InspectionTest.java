package org.jahr.backend.inspection.model;

import org.jahr.backend.area.Area;
import org.jahr.backend.area.AreaRepository;
import org.jahr.backend.inspection.repository.InspectionRepository;
import org.jahr.backend.inspectionIssue.InspectionIssue;
import org.jahr.backend.issue.model.Issue;
import org.jahr.backend.issue.repository.IssueRepository;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
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

    @Order(0)
    @Test
    void canAddInspection() {
        // Arrange
        int expected = 2;

        Area area = new Area("An area");
        areaRepo.save(area);

        Issue issue1 = new Issue("An issue", "", 7, "url");
        Issue issue2 = new Issue("Another issue", "", 4, "url");
        issueRepo.save(issue1);
        issueRepo.save(issue2);


        Inspection inspection1 = new Inspection(null, "yyyy-MM-dd hh:mm", false, null, area);

        List<InspectionIssue> issues1 = new ArrayList<>();
        InspectionIssue inspectionIssue = InspectionIssue.add(inspection1, issue1);
        issues1.add(inspectionIssue);
        inspection1.setInspectionIssues(issues1);
        inspectionsRepo.save(inspection1);

        Inspection inspection2 = new Inspection(null, "yyyy-MM-dd hh:mm", false, null, area);
        inspectionsRepo.save(inspection2);

        // Act
        int actual = inspectionsRepo.findAll().size();

        // Assert
        assertEquals(expected, actual);
    }
}