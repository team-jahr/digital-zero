package org.jahr.backend.inspection.controller;

import lombok.RequiredArgsConstructor;

import org.jahr.backend.inspection.DTO.InspectionDTO;
import org.jahr.backend.inspection.DTO.InspectionListDTO;
import org.jahr.backend.inspection.DTO.InspectionResponseDTO;

import org.jahr.backend.inspection.service.InspectionService;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.jahr.backend.inspection.model.Inspection;
import org.jahr.backend.inspection.repository.InspectionRepository;
import org.jahr.backend.inspectionIssue.repository.InspectionIssueRepository;
import org.jahr.backend.issue.model.Issue;
import org.jahr.backend.issue.service.IssueService;
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

import javax.mail.MessagingException;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
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
            InspectionRepository inspectionRepo,
            AreaRepository areaRepo,
            InspectionIssueRepository inspectionIssueRepo,
            LocationRepository locationRepo,
            UserRepository userRepo,
            IssueService issueService
    ) {
        this.inspectionRepo = inspectionRepo;
        this.areaRepo = areaRepo;
        this.inspectionIssueRepo = inspectionIssueRepo;
        this.locationRepo = locationRepo;
        this.userRepo = userRepo;
        this.issueService = issueService;
    }

    // Temporary for test of deployment
    @GetMapping

    @PostMapping("/new-inspection")
    @ResponseStatus(HttpStatus.OK)
    public InspectionResponseDTO createInspection() {
        return InspectionResponseDTO.toInspectionResponseDTO(service.createInspection());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public InspectionListDTO updateInspection(@RequestBody InspectionDTO inspection) throws MessagingException {
        service.updateInspection(inspection);
        return InspectionListDTO.fromInspections(service.getInspections());
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


        File imgFile = new File("test.png");
        String encodedImg;
        try (FileInputStream fileInputStream = new FileInputStream(imgFile)) {
            encodedImg = Base64.getEncoder().encodeToString(fileInputStream.readAllBytes());
        } catch (IOException e) {
            throw new RuntimeException("Could handle test image");
        }

        Issue issue1 = new Issue(1, "An issue", "", "warning", encodedImg);
        Issue issue2 = new Issue(2, "Another issue", "", "warning", encodedImg);
        issueService.createIssue(issue1);
        issueService.createIssue(issue2);


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

//    @PutMapping
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    public InspectionResponseDTO updateInspection(@PathVariable int id){
//        return InspectionResponseDTO.toInspectionResponseDTO(service.updateInspection(id));
//    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public InspectionListDTO deleteInspection(@PathVariable int id) {
        return InspectionListDTO.fromInspections(service.deleteInspection(id));
    }
}
