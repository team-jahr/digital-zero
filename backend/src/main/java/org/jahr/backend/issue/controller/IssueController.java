package org.jahr.backend.issue.controller;

import org.jahr.backend.issue.DTO.IssueDTO;
import org.jahr.backend.issue.DTO.IssueListDTO;
import org.jahr.backend.issue.model.Issue;
import org.jahr.backend.issue.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    private final IssueService issueService;

    @Autowired
    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @GetMapping
    public ResponseEntity<IssueListDTO> getAllIssues() {
        List<Issue> issues = issueService.getAllIssues();
        return ResponseEntity.ok(IssueListDTO.fromIssues(issues));
    }

    @GetMapping("/{id}")
    public ResponseEntity<IssueDTO> getIssueById(@PathVariable("id") Integer id) {
        Issue issue = issueService.getIssueById(id);
        return ResponseEntity.ok(IssueDTO.fromIssue(issue));
    }

    @PostMapping
    public ResponseEntity<IssueDTO> createIssue(@RequestBody Issue issue) {
        Issue createdIssue = issueService.createIssue(issue);
        return ResponseEntity.created(URI.create("/api/issues/" + createdIssue.getId()))
                .body(IssueDTO.fromIssue(createdIssue));
    }

    @PutMapping("/{id}")
    public ResponseEntity<IssueDTO> updateIssue(
            @PathVariable("id") Integer id, @RequestBody Issue issue
    ) {
        Issue updatedIssue = issueService.updateIssue(id, issue);
        return ResponseEntity.accepted().body(IssueDTO.fromIssue(updatedIssue));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteIssue(@PathVariable("id") Integer id) {
        issueService.deleteIssue(id);
        return ResponseEntity.noContent().build();
    }

}
