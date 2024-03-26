package org.jahr.backend.controller;

import org.jahr.backend.model.HelloWorld;
import org.jahr.backend.repository.HelloWorldRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.WritableResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.Charset;
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
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        return ResponseEntity.ok().headers(headers).body(repo.findAll());
    }

    @Value("azure-blob://inspection-tracker-blob/tes.txt")
    private Resource blobFile;

    @GetMapping("/readBlobFile")
    public ResponseEntity<String> readBlobFile() throws IOException {
        return ResponseEntity.ok(
                StreamUtils.copyToString(this.blobFile.getInputStream(), Charset.defaultCharset()));
    }

    @PostMapping("/writeBlobFile")
    public ResponseEntity<String> writeBlobFile(@RequestBody String data) throws IOException {
        try (OutputStream os = ((WritableResource) this.blobFile).getOutputStream()) {
            os.write(data.getBytes());
        }
        return ResponseEntity.ok("file was updated");
    }

}
