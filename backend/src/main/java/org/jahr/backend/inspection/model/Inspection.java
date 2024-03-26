package org.jahr.backend.inspection.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "inspection")
public class Inspection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inspection_id")
    private int id;
}
