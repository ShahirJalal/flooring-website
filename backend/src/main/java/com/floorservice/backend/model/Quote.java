package com.floorservice.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "quotes")
public class Quote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;
    private String address;
    private String floorType;
    private String roomType;
    private Integer squareFeet;
    private String timeline;

    @Column(length = 1000)
    private String message;

    private String status = "not completed";

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}