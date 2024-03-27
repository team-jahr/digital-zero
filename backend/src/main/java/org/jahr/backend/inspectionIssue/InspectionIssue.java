package org.jahr.backend.inspectionIssue;

import jakarta.persistence.*;
import lombok.Data;
import org.jahr.backend.inspection.model.Inspection;
import org.jahr.backend.issue.model.Issue;

@Data
@Entity
@Table(name = "inspection_issue")
public class InspectionIssue {

    @EmbeddedId
    private InspectionIssueKey id;

    @ManyToOne
    @MapsId("inspectionId")
    @JoinColumn(name = "inspection_id")
    private Inspection inspection;

    @ManyToOne
    @MapsId("issueId")
    @JoinColumn(name = "issue_id")
    private Issue issue;

    public InspectionIssue() {
    }

    public InspectionIssue(InspectionIssueKey id, Inspection inspection, Issue issue) {
        this.id = id;
        this.inspection = inspection;
        this.issue = issue;
    }
}
