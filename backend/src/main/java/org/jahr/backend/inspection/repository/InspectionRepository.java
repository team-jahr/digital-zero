package org.jahr.backend.inspection.repository;

import org.jahr.backend.inspection.model.Inspection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InspectionRepository extends JpaRepository<Inspection, Integer> {
}
