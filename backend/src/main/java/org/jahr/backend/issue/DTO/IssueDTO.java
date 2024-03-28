package org.jahr.backend.issue.DTO;

import org.jahr.backend.issue.model.Issue;

public record IssueDTO(String title, String description, String severity, String imgRef) {

    public static IssueDTO fromIssue(Issue issue) {
        return new IssueDTO(issue.getTitle(),
                            issue.getDescription(),
                            issue.getSeverity(),
                            issue.getImgRef()
        );
    }

    public static Issue toIssue(IssueDTO dto) {
        return new Issue(dto.title(), dto.description(), dto.severity(), dto.imgRef());
    }
}
