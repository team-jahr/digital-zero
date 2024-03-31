package org.jahr.backend.issue.controller;

import org.jahr.backend.issue.DTO.IssueDTO;
import org.jahr.backend.issue.DTO.IssueListDTO;
import org.jahr.backend.issue.model.Issue;
import org.jahr.backend.issue.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/issues")
public class IssueController {

    private final IssueService issueService;

    @Autowired
    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @GetMapping
    public ResponseEntity<IssueListDTO> getAllIssues() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        List<Issue> issues = issueService.getAllIssues();
        return ResponseEntity.ok().headers(headers).body(IssueListDTO.fromIssues(issues));
    }

    @GetMapping("/{id}")
    public ResponseEntity<IssueDTO> getIssueById(@PathVariable("id") Integer id) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        Issue issue = issueService.getIssueById(id);
        return ResponseEntity.ok().headers(headers).body(IssueDTO.fromIssue(issue));
    }

    @PostMapping
    public ResponseEntity<IssueDTO> createIssue(@RequestBody IssueDTO issue) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        Issue createdIssue = issueService.createIssue(issue);
        return ResponseEntity.created(URI.create("/api/issues/" + createdIssue.getId()))
                .headers(headers)
                .body(IssueDTO.fromIssue(createdIssue));
    }

    @PutMapping("/{id}")
    public ResponseEntity<IssueDTO> updateIssue(
            @PathVariable("id") Integer id, @RequestBody IssueDTO issue
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        Issue updatedIssue = issueService.updateIssue(id, issue);
        return ResponseEntity.accepted().headers(headers).body(IssueDTO.fromIssue(updatedIssue));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteIssue(@PathVariable("id") Integer id) {
        issueService.deleteIssue(id);
        return ResponseEntity.noContent().build();
    }

}
