package org.jahr.backend.inspection.model;

import jakarta.persistence.*;
import lombok.Data;
import org.jahr.backend.area.Area;
import org.jahr.backend.inspectionIssue.InspectionIssue;

import java.util.List;

@Data
@Entity
@Table(name = "inspection")
public class Inspection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "description")
    private String description;

    @Column(name = "date")
    private String date;

    @Column(name = "submitted")
    private boolean submitted;

    @Column(name = "reported_to")
    private String reportedTo;

    @ManyToOne
    @JoinColumn(name = "area_id", nullable = false)
    private Area area;

    @OneToMany(mappedBy = "inspection", cascade = CascadeType.MERGE)
    private List<InspectionIssue> inspectionIssues;

    public Inspection() {
    }

    public Inspection(String description,
                      String date,
                      boolean submitted,
                      String reportedTo,
                      Area area) {
        this.description = description;
        this.date = date;
        this.submitted = submitted;
        this.reportedTo = reportedTo;
        this.area = area;
    }
}
