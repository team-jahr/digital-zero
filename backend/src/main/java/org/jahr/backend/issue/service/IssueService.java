package org.jahr.backend.issue.service;

import lombok.RequiredArgsConstructor;
import org.jahr.backend.issue.client.IssueBlobClient;
import org.jahr.backend.issue.model.Issue;
import org.jahr.backend.issue.repository.IssueRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class IssueService {

    private final IssueRepository issueRepository;
    private final IssueBlobClient issueBlobClient;

    public List<Issue> getAllIssues() {
        List<Issue> issues = issueRepository.findAll();
        issues.forEach(issue -> issue.setImgRef(issueBlobClient.getIssueImages(issue)));
        return issueRepository.findAll();
    }

    public Issue getIssueById(Integer id) {
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Issue not found with id: " + id));
        issue.setImgRef(issueBlobClient.getIssueImages(issue));
        return issue;
    }

    public Issue createIssue(Issue issue) {
        return issueRepository.save(convertIssueImageDataToNames(issue));
    }

    public Issue updateIssue(Integer id, Issue issue) {
        issue.setId(id);
        return issueRepository.save(convertIssueImageDataToNames(issue));
    }

    public void deleteIssue(Integer id) {
        issueRepository.deleteById(id);
    }

    private Issue convertIssueImageDataToNames(Issue issue) {
        return issueBlobClient.uploadIssueImages(issue);
    }
}

