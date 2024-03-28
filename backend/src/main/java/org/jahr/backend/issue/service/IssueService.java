package org.jahr.backend.issue.service;

import lombok.RequiredArgsConstructor;
import org.jahr.backend.issue.model.Issue;
import org.jahr.backend.issue.repository.IssueRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IssueService {

    private final IssueRepository issueRepository;

    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    public Issue getIssueById(Integer id) {
        return issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found with id: " + id));
    }

    public Issue createIssue(Issue issue) {
        return issueRepository.save(issue);
    }

    public Issue updateIssue(Integer id, Issue issue) {
        issue.setId(id);
        return issueRepository.save(issue);
    }

    public void deleteIssue(Integer id) {
        issueRepository.deleteById(id);
    }
}

