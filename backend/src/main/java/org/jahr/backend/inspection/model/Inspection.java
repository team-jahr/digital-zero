package org.jahr.backend.inspection.model;

import jakarta.persistence.*;
import lombok.Data;
import org.jahr.backend.area.Area;

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
    

    public Inspection() {
    }

    public Inspection(String description, String date, boolean submitted, String reportedTo,
                      Area area) {
        this.description = description;
        this.date = date;
        this.submitted = submitted;
        this.reportedTo = reportedTo;
        this.area = area;
    }
}
