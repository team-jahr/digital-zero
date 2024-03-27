package org.jahr.backend.inspectionIssue.repository;

import org.jahr.backend.inspectionIssue.model.InspectionIssue;
import org.jahr.backend.inspectionIssue.model.InspectionIssueKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InspectionIssueRepository
        extends JpaRepository<InspectionIssue, InspectionIssueKey> {
}
