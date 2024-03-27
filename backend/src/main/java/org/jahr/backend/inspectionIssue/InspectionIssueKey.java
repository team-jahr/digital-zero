package org.jahr.backend.inspectionIssue;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Data
@Embeddable
public class InspectionIssueKey implements Serializable {

    @Column(name = "inspection_id")
    private int inspectionId;

    @Column(name = "issue_id")
    private int issueId;

    public InspectionIssueKey() {
    }

    public InspectionIssueKey(int inspectionId, int issueId) {
        this.inspectionId = inspectionId;
        this.issueId = issueId;
    }
}
