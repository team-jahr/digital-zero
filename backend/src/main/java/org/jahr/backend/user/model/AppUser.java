package org.jahr.backend.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.jahr.backend.inspection.model.Inspection;
import org.jahr.backend.location.model.Location;

import java.util.List;

@Data
@Entity
@Table(name = "app_user")
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "email")
    private String email;

    @ManyToOne
    @JoinColumn(name = "location_id")
    @JsonIgnore
    private Location location;

    @OneToMany(mappedBy = "appUser", cascade = CascadeType.PERSIST)
    @JsonIgnore
    private List<Inspection> inspections;

    public AppUser() {
    }

    public AppUser(int id, String email, Location location) {
        this.id = id;
        this.email = email;
        this.location = location;
    }

}
