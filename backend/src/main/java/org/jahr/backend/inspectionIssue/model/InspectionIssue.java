package org.jahr.backend.inspectionIssue.model;

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

    public InspectionIssue(Inspection inspection, Issue issue) {
        this.id = new InspectionIssueKey(inspection.getId(), issue.getId());
        this.inspection = inspection;
        this.issue = issue;
    }

    private InspectionIssue(InspectionIssueKey id, Inspection inspection, Issue issue) {
        this.id = id;
        this.inspection = inspection;
        this.issue = issue;
    }

    public static InspectionIssue add(Inspection inspection, Issue issue) {
        return new InspectionIssue(new InspectionIssueKey(inspection.getId(), issue.getId()),
                                   inspection,
                                   issue);
    }
}
