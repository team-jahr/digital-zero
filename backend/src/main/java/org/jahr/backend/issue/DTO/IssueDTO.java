package org.jahr.backend.issue.DTO;

import org.jahr.backend.issue.model.Issue;

import java.util.Arrays;
import java.util.List;

public record IssueDTO(int id, String title, String description, String severity,
                       List<String> images) {

    public static IssueDTO fromIssue(Issue issue) {
        return new IssueDTO(issue.getId(),
                issue.getTitle(),
                issue.getDescription(),
                issue.getSeverity(),
                Arrays.asList(issue.getImgRef().split(","))
        );
    }

    public static Issue toIssue(IssueDTO dto) {
        return new Issue(
                dto.title(),
                dto.description(),
                dto.severity(),
                String.join(",", dto.images())
        );
    }
}
