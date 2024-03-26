package org.jahr.backend.issue.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "issue")
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

}
