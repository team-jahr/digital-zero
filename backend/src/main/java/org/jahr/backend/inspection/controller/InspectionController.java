package org.jahr.backend.inspection.controller;

import org.jahr.backend.area.model.Area;
import org.jahr.backend.area.repository.AreaRepository;
import org.jahr.backend.inspection.DTO.InspectionDTO;
import org.jahr.backend.inspection.DTO.InspectionListDTO;
import org.jahr.backend.inspection.DTO.InspectionResponseDTO;
import org.jahr.backend.inspection.model.Inspection;
import org.jahr.backend.inspection.repository.InspectionRepository;
import org.jahr.backend.inspection.service.InspectionService;
import org.jahr.backend.inspectionIssue.repository.InspectionIssueRepository;
import org.jahr.backend.issue.model.Issue;
import org.jahr.backend.issue.service.IssueService;
import org.jahr.backend.location.model.Location;
import org.jahr.backend.location.repository.LocationRepository;
import org.jahr.backend.user.model.AppUser;
import org.jahr.backend.user.repository.UserRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;

@RestController
@CrossOrigin
//@RequiredArgsConstructor
@RequestMapping("/api/inspections")
public class InspectionController {
    private final InspectionService service;
    private final InspectionRepository inspectionRepo;
    private final AreaRepository areaRepo;
    private final InspectionIssueRepository inspectionIssueRepo;
    private final LocationRepository locationRepo;
    private final UserRepository userRepo;
    private final IssueService issueService;

    // Temporary for test of deployment
    public InspectionController(
            InspectionService service,
            InspectionRepository inspectionRepo,
            AreaRepository areaRepo,
            InspectionIssueRepository inspectionIssueRepo,
            LocationRepository locationRepo,
            UserRepository userRepo,
            IssueService issueService
    ) {
        this.service = service;
        this.inspectionRepo = inspectionRepo;
        this.areaRepo = areaRepo;
        this.inspectionIssueRepo = inspectionIssueRepo;
        this.locationRepo = locationRepo;
        this.userRepo = userRepo;
        this.issueService = issueService;
    }

    // Temporary for test of deployment

    @PostMapping("/new-inspection")
    @ResponseStatus(HttpStatus.OK)
    public InspectionResponseDTO createInspection() {
        return InspectionResponseDTO.toInspectionResponseDTO(service.createInspection());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public InspectionListDTO updateInspection(@RequestBody InspectionDTO inspection)
            throws MessagingException {
        service.updateInspection(inspection);
        return InspectionListDTO.fromInspections(service.getInspections());
    }

    @GetMapping
    public ResponseEntity<InspectionListDTO> getInspections() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        List<Inspection> inspections = service.getInspections();
//        if (inspections.size() < 2) {
//            mockInspections();
//            inspections = inspectionRepo.findAll();
//        }

        InspectionListDTO dto = InspectionListDTO.fromInspections(inspections);

        return ResponseEntity.ok().headers(headers).body(dto);
    }

    // Temporary fill of mock data to database for testing of deployment
    private void mockInspections() {
        Location location = new Location("A location");
        locationRepo.save(location);

        AppUser appUser = new AppUser(1, "test@gmail.com", location);
        userRepo.save(appUser);

        Area area = new Area("An area", location);
        areaRepo.save(area);


        File imgFile1 = new File("cat1.png");
        String encodedImg1;
        try (FileInputStream fileInputStream = new FileInputStream(imgFile1)) {
            encodedImg1 = Base64.getEncoder().encodeToString(fileInputStream.readAllBytes());
        } catch (IOException e) {
            throw new RuntimeException("Could handle test image");
        }

        File imgFile2 = new File("cat2.png");
        String encodedImg2;
        try (FileInputStream fileInputStream = new FileInputStream(imgFile2)) {
            encodedImg2 = Base64.getEncoder().encodeToString(fileInputStream.readAllBytes());
        } catch (IOException e) {
            throw new RuntimeException("Could handle test image");
        }

        File imgFile3 = new File("dog1.png");
        String encodedImg3;
        try (FileInputStream fileInputStream = new FileInputStream(imgFile3)) {
            encodedImg3 = Base64.getEncoder().encodeToString(fileInputStream.readAllBytes());
        } catch (IOException e) {
            throw new RuntimeException("Could handle test image");
        }

        File imgFile4 = new File("dog2.png");
        String encodedImg4;
        try (FileInputStream fileInputStream = new FileInputStream(imgFile4)) {
            encodedImg4 = Base64.getEncoder().encodeToString(fileInputStream.readAllBytes());
        } catch (IOException e) {
            throw new RuntimeException("Could handle test image");
        }

        Issue issue1 = new Issue(1, "An issue", "", "warning", encodedImg1 + ',' + encodedImg2);
        Issue issue2 =
                new Issue(2, "Another issue", "", "warning", encodedImg3 + ',' + encodedImg4);
        issueService.createIssue(issue1);
        issueService.createIssue(issue2);

        InspectionDTO inspectionDTO1 = new InspectionDTO(
                1,
                "An inspection",
                false,
                LocalDateTime.now(),
                area,
                location,
                "test@gmail.com",
                appUser
        );
        InspectionDTO inspectionDTO2 = new InspectionDTO(
                2,
                "Another inspection",
                false,
                LocalDateTime.now(),
                area,
                location,
                "test@gmail.com",
                appUser
        );

//        Inspection inspection2 = new Inspection("Another inspection",
//                                                LocalDateTime.now(),
//                                                false,
//                                                null,
//                                                area,
//                                                appUser
//        );

//        inspection1.addIssue(issue2);
//        inspection2.addIssue(issue1);

        service.createInspection();
        service.createInspection();
        try {
            service.updateInspection(inspectionDTO1);
            service.updateInspection(inspectionDTO2);
        } catch (MessagingException e) {
            throw new RuntimeException("Error saving inspections");
        }
//        inspectionRepo.save(inspection1);
//        inspectionRepo.save(inspection2);
        Inspection inspection1 = InspectionDTO.toInspection(inspectionDTO1);
        Inspection inspection2 = InspectionDTO.toInspection(inspectionDTO2);

        inspection1.addIssue(issue1);
        inspection1.addIssue(issue2);
        inspection2.addIssue(issue1);

//        InspectionIssue ii1 = new InspectionIssue(inspection1, issue1);
//        InspectionIssue ii2 = new InspectionIssue(InspectionDTO.toInspection(inspection2),
//        issue2);
        inspectionIssueRepo.saveAll(inspection1.getInspectionIssues());
        inspectionIssueRepo.saveAll(inspection2.getInspectionIssues());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public InspectionListDTO deleteInspection(@PathVariable int id) {
        return InspectionListDTO.fromInspections(service.deleteInspection(id));
    }
}
