package org.jahr.backend.issue.DTO;

import org.jahr.backend.issue.model.Issue;

import java.util.ArrayList;
import java.util.List;

public record IssueListDTO(List<IssueDTO> dtos) {

    public static IssueListDTO fromIssues(List<Issue> issues) {
        List<IssueDTO> dtos = new ArrayList<>();
        issues.forEach(issue -> dtos.add(new IssueDTO(issue.getTitle(),
                                                      issue.getDescription(),
                                                      issue.getSeverity(),
                                                      issue.getImgRef()
        )));

        return new IssueListDTO(dtos);
    }
}
