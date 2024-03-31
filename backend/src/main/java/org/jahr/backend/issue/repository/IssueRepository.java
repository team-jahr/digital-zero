package org.jahr.backend.issue.repository;

import org.jahr.backend.issue.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IssueRepository
        extends JpaRepository<Issue, Integer> {
}
