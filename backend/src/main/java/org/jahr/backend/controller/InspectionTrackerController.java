package org.jahr.backend.controller;

import org.jahr.backend.model.HelloWorld;
import org.jahr.backend.repository.HelloWorldRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/inspections")
public class InspectionTrackerController {

    private final HelloWorldRepository repo;

    public InspectionTrackerController(HelloWorldRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public ResponseEntity<List<HelloWorld>> helloWorld() {
        repo.save(new HelloWorld("Hello world"));
        return ResponseEntity.ok(repo.findAll());
    }
}
