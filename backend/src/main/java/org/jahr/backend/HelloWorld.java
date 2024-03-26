package org.jahr.backend;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class HelloWorld {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String msg;

    public HelloWorld() {
    }

    public HelloWorld(String msg) {
        this.msg = msg;
    }
}
