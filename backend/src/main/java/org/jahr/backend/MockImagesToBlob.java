package org.jahr.backend;

import org.jahr.backend.issue.DTO.IssueListDTO;
import org.jahr.backend.issue.model.Issue;
import org.jahr.backend.issue.service.IssueService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/mockToBlob")
public class MockImagesToBlob {

    private final IssueService service;

    public MockImagesToBlob(IssueService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<IssueListDTO> mainMock() {
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
        service.createIssue(issue1);
        service.createIssue(issue2);

        List<Issue> issues = service.getAllIssues();
        IssueListDTO dto = IssueListDTO.fromIssues(issues);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        return ResponseEntity.ok().headers(headers).body(dto);
    }
}
