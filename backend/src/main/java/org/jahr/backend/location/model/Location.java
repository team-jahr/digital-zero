package org.jahr.backend.location.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.jahr.backend.area.model.Area;
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

    @OneToMany(mappedBy = "location",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Area> areas;

    @OneToMany(mappedBy = "location", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JsonIgnore
    private List<AppUser> appUsers;

    public Location() {
    }

    public Location(String name) {
        this.name = name;
    }
}
