package org.jahr.backend.issue.DTO;

import org.jahr.backend.issue.model.Issue;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public record IssueListDTO(List<IssueDTO> issues) {

    public static IssueListDTO fromIssues(List<Issue> issueList) {
        List<IssueDTO> issues = new ArrayList<>();
        issueList.forEach(issue -> issues.add(new IssueDTO(
                issue.getTitle(),
                issue.getDescription(),
                issue.getSeverity(),
                Arrays.asList(issue.getImgRef().split(","))
        )));

        return new IssueListDTO(issues);
    }
}
