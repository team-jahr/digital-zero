package org.jahr.backend.inspection.controller;
import lombok.RequiredArgsConstructor;
import org.jahr.backend.area.AreaRepository;
import org.jahr.backend.inspection.DTO.InspectionDTO;
import org.jahr.backend.inspection.repository.InspectionRepository;
import org.jahr.backend.inspection.service.InspectionService;
import org.jahr.backend.inspectionIssue.repository.InspectionIssueRepository;
import org.jahr.backend.issue.repository.IssueRepository;
import org.jahr.backend.location.repository.LocationRepository;
import org.jahr.backend.user.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;



@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/inspections")
public class InspectionController {


    private final InspectionService service;

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public void createInspection(@RequestBody InspectionDTO inspection){
        service.createInspection(inspection);
    }

//    // Temporary for test of deployment
//    @GetMapping
//    public ResponseEntity<InspectionListDTO> getInspections() {
//        HttpHeaders headers = new HttpHeaders();
//        headers.set("Content-Type", "application/json");
//
//        List<Inspection> inspections = inspectionRepo.findAll();
//        if (inspections.size() < 2) {
//            mockInspections();
//            inspections = inspectionRepo.findAll();
//        }
//
//        InspectionListDTO dto = InspectionListDTO.fromInspections(inspections);
//
//        return ResponseEntity.ok().headers(headers).body(dto);
//    }
//
//    // Temporary fill of mock data to database for testing of deployment
//    private void mockInspections() {
//        Location location = new Location("A location");
//        locationRepo.save(location);
//
//        AppUser appUser = new AppUser("email", location);
//        userRepo.save(appUser);
//
//        Area area = new Area("An area", location);
//        areaRepo.save(area);
//
//        Issue issue1 = new Issue("An issue", "", "warning", "url");
//        Issue issue2 = new Issue("Another issue", "", "warning", "url");
//        issueRepo.save(issue1);
//        issueRepo.save(issue2);
//
//
//        Inspection inspection1 =
//                new Inspection("An inspection", "yyyy-MM-dd hh:mm", false, null, area, appUser);
//        Inspection inspection2 = new Inspection("Another inspection",
//                                                "yyyy-MM-dd hh:mm",
//                                                false,
//                                                null,
//                                                area,
//                                                appUser
//        );
//
//        inspection1.addIssue(issue2);
//        inspection2.addIssue(issue1);
//
//        inspectionRepo.save(inspection1);
//        inspectionRepo.save(inspection2);
//
//        inspectionIssueRepo.saveAll(inspection1.getInspectionIssues());
//        inspectionIssueRepo.saveAll(inspection2.getInspectionIssues());
//    }
//
//    @Value("azure-blob://inspection-tracker-blob/tes.txt")
//    private Resource blobFile;
//
//    @GetMapping("/readBlobFile")
//    public ResponseEntity<String> readBlobFile() throws IOException {
//        return ResponseEntity.ok(StreamUtils.copyToString(this.blobFile.getInputStream(),
//                                                          Charset.defaultCharset()
//        ));
//    }
//
//    @PostMapping("/writeBlobFile")
//    public ResponseEntity<String> writeBlobFile(@RequestBody String data) throws IOException {
//        try (OutputStream os = ((WritableResource) this.blobFile).getOutputStream()) {
//            os.write(data.getBytes());
//        }
//        return ResponseEntity.ok("file was updated");
//    }

}
