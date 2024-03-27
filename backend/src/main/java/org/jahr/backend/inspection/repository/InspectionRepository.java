package org.jahr.backend.inspection.repository;

import org.jahr.backend.inspection.model.Inspection;
import org.jahr.backend.inspectionIssue.model.InspectionIssue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InspectionRepository extends JpaRepository<Inspection, Integer> {

    @Query("select i from Inspection i join fetch i.inspectionIssues where i.id = :inspectionId")
    List<InspectionIssue> findInspectionIssuesById(@Param("inspectionId") int inspectionId);
}
