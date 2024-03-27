package org.jahr.backend.area;

import jakarta.persistence.*;
import lombok.Data;
import org.jahr.backend.inspection.model.Inspection;

import java.util.List;

@Data
@Entity
@Table(name = "area")
public class Area {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @OneToMany(mappedBy = "area")
    private List<Inspection> inspections;
}
