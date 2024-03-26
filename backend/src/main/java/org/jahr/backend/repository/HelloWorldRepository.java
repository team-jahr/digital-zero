package org.jahr.backend.repository;

import org.jahr.backend.model.HelloWorld;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HelloWorldRepository extends JpaRepository<HelloWorld, Integer> {
}
