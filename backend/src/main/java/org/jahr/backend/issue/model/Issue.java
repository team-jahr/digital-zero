package org.jahr.backend.issue.model;

import jakarta.persistence.*;
import lombok.Data;
import org.jahr.backend.inspectionIssue.model.InspectionIssue;

import java.util.List;

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
    private String severity;

    @Column(name = "img_ref")
    private String imgRef;

    @OneToMany(mappedBy = "issue", cascade = CascadeType.PERSIST)
    private List<InspectionIssue> inspectionIssues;

    public Issue() {
    }

    public Issue(String title, String description, String severity, String imgRef) {
        this.title = title;
        this.description = description;
        this.severity = severity;
        this.imgRef = imgRef;
    }
}
