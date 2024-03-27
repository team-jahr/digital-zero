package org.jahr.backend.area;

import jakarta.persistence.*;
import lombok.Data;
import org.jahr.backend.inspection.model.Inspection;
import org.jahr.backend.location.model.Location;

import java.util.List;

@Data
@Entity
@Table(name = "area")
public class Area {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "area")
    private List<Inspection> inspections;

    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    public Area() {
    }

    public Area(String name, Location location) {
        this.name = name;
        this.location = location;
    }
}
