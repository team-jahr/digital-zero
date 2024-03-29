package org.jahr.backend.inspection.model;

import jakarta.persistence.*;
import lombok.Data;
import org.jahr.backend.area.Area;
import org.jahr.backend.inspectionIssue.model.InspectionIssue;
import org.jahr.backend.issue.model.Issue;
import org.jahr.backend.user.model.AppUser;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;
import java.util.ArrayList;
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
    private LocalDateTime date;

    @Column(name = "submitted")
    private boolean submitted;

    @Column(name = "reported_to")
    private String reportedTo;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "area_id", nullable = false)
    private Area area;

//    @ManyToOne
//    @JoinColumn(name = "app_user_id", nullable = false)
//    private AppUser appUser;

    @OneToMany(mappedBy = "inspection", cascade = CascadeType.MERGE)
    private List<InspectionIssue> inspectionIssues;

    public Inspection() {
    }

    public Inspection(
            String description,
            LocalDateTime date,
            boolean submitted,
            String reportedTo,
            Area area
    ) {
        this.description = description;
        this.date = date;
        this.submitted = submitted;
        this.reportedTo = reportedTo;
        this.area = area;
    }

    public void addIssue(Issue issue) {
        List<InspectionIssue> inspectionIssues = this.getInspectionIssues();
        InspectionIssue inspectionIssue = new InspectionIssue(this, issue);

        if (inspectionIssues == null) {
            List<InspectionIssue> newList = new ArrayList<>();
            newList.add(inspectionIssue);
            this.setInspectionIssues(newList);
        } else {
            inspectionIssues.add(inspectionIssue);
            this.setInspectionIssues(inspectionIssues);
        }
    }
}
