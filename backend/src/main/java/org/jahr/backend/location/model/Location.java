package org.jahr.backend.location.model;

import jakarta.persistence.*;
import lombok.Data;
import org.jahr.backend.area.Area;
import org.jahr.backend.user.model.AppUser;

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

    @OneToMany(mappedBy = "location", cascade = CascadeType.PERSIST)
    private List<Area> areas;

    @OneToMany(mappedBy = "location", cascade = CascadeType.PERSIST)
    private List<AppUser> appUsers;

    public Location() {
    }

    public Location(String name) {
        this.name = name;
    }
}
