package com.floorservice.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "contacts")
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;
    private String subject;

    @Column(length = 1000)
    private String message;

    private String status = "not completed";

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}