package org.jahr.backend.issue.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "issue")
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "severity")
    private int severity;

    @Column(name = "img_ref")
    private String imgRef;

    public Issue() {
    }

    public Issue(String title, String description, int severity, String imgRef) {
        this.title = title;
        this.description = description;
        this.severity = severity;
        this.imgRef = imgRef;
    }
}
