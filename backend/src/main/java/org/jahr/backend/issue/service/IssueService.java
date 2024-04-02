package org.jahr.backend.issue.service;

import lombok.RequiredArgsConstructor;
import org.jahr.backend.inspection.exception.InspectionNotFoundException;
import org.jahr.backend.inspection.model.Inspection;
import org.jahr.backend.inspection.repository.InspectionRepository;
import org.jahr.backend.inspectionIssue.model.InspectionIssue;
import org.jahr.backend.inspectionIssue.repository.InspectionIssueRepository;
import org.jahr.backend.issue.DTO.IssueDTO;
import org.jahr.backend.issue.DTO.IssueListDTO;
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
    private final InspectionIssueRepository inspectionIssueRepository;
    private final InspectionRepository inspectionRepository;
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

    public Issue createIssue(IssueDTO issueDTO) {
        Issue issue = uploadImagesToBlob(issueDTO);
        Inspection inspection = inspectionRepository.findById(issueDTO.id())
                .orElseThrow(() -> new InspectionNotFoundException("Inspection not found."));
        InspectionIssue inspectionIssue = new InspectionIssue(inspection, issue);
        inspectionIssueRepository.save(inspectionIssue);
        return issue;
    }

    public IssueListDTO getIssuesForForm(IssueDTO issueDTO){
        Inspection inspection = inspectionRepository.findById(issueDTO.id()).orElseThrow(()-> new InspectionNotFoundException("Inspection not found."));
        List<Issue> getAllIssues = inspection.getInspectionIssues().stream().map(InspectionIssue::getIssue).toList();
        return IssueListDTO.fromIssues(getAllIssues);
    }

    public Issue updateIssue(Integer id, IssueDTO issueDTO) {
        Issue issue = uploadImagesToBlob(issueDTO, id);
        issue.setId(id);
        return issueRepository.save(issue);
    }

    public void deleteIssue(Integer id) {
        inspectionIssueRepository.findAll()
                .stream()
                .filter(el -> el.getId().getIssueId() == id)
                .forEach(el -> inspectionIssueRepository.deleteById(el.getId()));
        issueRepository.deleteById(id);
    }

    private Issue uploadImagesToBlob(IssueDTO issueDTO) {
        return uploadImagesToBlob(issueDTO, null);
    }

    private Issue uploadImagesToBlob(IssueDTO issueDTO, Integer id) {
        Issue issue = IssueDTO.toIssue(issueDTO);
        if (id != null) issue.setId(id);
        issue.setImgRef("");
        Issue newIssue = issueRepository.save(issue);
        newIssue.setImgRef(String.join(",", issueDTO.images()));
        return issueBlobClient.uploadIssueImages(newIssue);
    }

}

