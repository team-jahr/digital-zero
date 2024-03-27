package org.jahr.backend.location.model;

import jakarta.persistence.*;
import lombok.Data;
import org.jahr.backend.area.Area;

import java.util.List;

@Data
@Entity
@Table(name = "location")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "location", cascade = CascadeType.MERGE)
    private List<Area> area;

    public Location() {
    }

    public Location(String name) {
        this.name = name;
    }
}
