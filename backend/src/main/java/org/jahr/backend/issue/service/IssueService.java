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
        Issue issue = IssueDTO.toIssue(issueDTO);
        issue.setImgRef("");
        Issue newIssue = issueRepository.save(issue);
        newIssue.setImgRef(String.join(",", issueDTO.images()));
        newIssue = convertIssueImageDataToNames(newIssue);
        Inspection inspection = inspectionRepository.findById(issueDTO.id()).orElseThrow(()-> new InspectionNotFoundException("Inspection not found."));
        InspectionIssue inspectionIssue =  new InspectionIssue(inspection,newIssue);
        inspectionIssueRepository.save(inspectionIssue);
        return newIssue;
    }

    public IssueListDTO getIssuesForForm(IssueDTO issueDTO){
        Inspection inspection = inspectionRepository.findById(issueDTO.id()).orElseThrow(()-> new InspectionNotFoundException("Inspection not found."));
        List<Issue> getAllIssues = inspection.getInspectionIssues().stream().map(InspectionIssue::getIssue).toList();
        return IssueListDTO.fromIssues(getAllIssues);
    }

    public Issue updateIssue(Integer id, IssueDTO issueDTO) {
        Issue issue = IssueDTO.toIssue(issueDTO);
        return issueRepository.save(convertIssueImageDataToNames(issue));
    }

    public void deleteIssue(Integer id) {
        issueRepository.deleteById(id);
    }

    private Issue convertIssueImageDataToNames(Issue issue) {
        return issueBlobClient.uploadIssueImages(issue);
    }
}

