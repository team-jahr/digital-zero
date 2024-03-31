package org.jahr.backend.issue.DTO;

import org.jahr.backend.issue.model.Issue;

import java.util.Arrays;
import java.util.List;

public record IssueDTO(String title, String description, String severity, List<String> imgRef) {

    public static IssueDTO fromIssue(Issue issue) {
        return new IssueDTO(issue.getTitle(),
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
                String.join(",", dto.imgRef())
        );
    }
}
