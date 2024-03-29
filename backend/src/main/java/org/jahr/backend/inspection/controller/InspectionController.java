package org.jahr.backend.inspection.controller;

import org.jahr.backend.area.Area;
import org.jahr.backend.area.AreaRepository;
import org.jahr.backend.inspection.DTO.InspectionListDTO;
import org.jahr.backend.inspection.model.Inspection;
import org.jahr.backend.inspection.repository.InspectionRepository;
import org.jahr.backend.inspectionIssue.repository.InspectionIssueRepository;
import org.jahr.backend.issue.model.Issue;
import org.jahr.backend.issue.repository.IssueRepository;
import org.jahr.backend.location.model.Location;
import org.jahr.backend.location.repository.LocationRepository;
import org.jahr.backend.user.model.AppUser;
import org.jahr.backend.user.repository.UserRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/inspections")
public class InspectionController {

    private final InspectionRepository inspectionRepo;
    private final AreaRepository areaRepo;
    private final IssueRepository issueRepo;
    private final InspectionIssueRepository inspectionIssueRepo;
    private final LocationRepository locationRepo;
    private final UserRepository userRepo;

    // Temporary for test of deployment
    public InspectionController(
            InspectionRepository inspectionRepo,
            AreaRepository areaRepo,
            IssueRepository issueRepo,
            InspectionIssueRepository inspectionIssueRepo,
            LocationRepository locationRepo,
            UserRepository userRepo
    ) {
        this.inspectionRepo = inspectionRepo;
        this.areaRepo = areaRepo;
        this.issueRepo = issueRepo;
        this.inspectionIssueRepo = inspectionIssueRepo;
        this.locationRepo = locationRepo;
        this.userRepo = userRepo;
    }

    // Temporary for test of deployment
    @GetMapping
    public ResponseEntity<InspectionListDTO> getInspections() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        List<Inspection> inspections = inspectionRepo.findAll();
        if (inspections.size() < 2) {
            mockInspections();
            inspections = inspectionRepo.findAll();
        }

        InspectionListDTO dto = InspectionListDTO.fromInspections(inspections);

        return ResponseEntity.ok().headers(headers).body(dto);
    }

    // Temporary fill of mock data to database for testing of deployment
    private void mockInspections() {
        Location location = new Location("A location");
        locationRepo.save(location);

        AppUser appUser = new AppUser("email", location);
        userRepo.save(appUser);

        Area area = new Area("An area", location);
        areaRepo.save(area);

        Issue issue1 = new Issue("An issue", "", "warning", "dog1.jpeg");
        Issue issue2 = new Issue("Another issue", "", "warning", "dog1.jpeg");
        issueRepo.save(issue1);
        issueRepo.save(issue2);


        Inspection inspection1 =
                new Inspection("An inspection", "yyyy-MM-dd hh:mm", false, null, area, appUser);
        Inspection inspection2 = new Inspection("Another inspection",
                                                "yyyy-MM-dd hh:mm",
                                                false,
                                                null,
                                                area,
                                                appUser
        );

        inspection1.addIssue(issue2);
        inspection2.addIssue(issue1);

        inspectionRepo.save(inspection1);
        inspectionRepo.save(inspection2);

        inspectionIssueRepo.saveAll(inspection1.getInspectionIssues());
        inspectionIssueRepo.saveAll(inspection2.getInspectionIssues());
    }

}
