package com.pacman.gibb.model;

import lombok.Data;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Highscore {

    @Id
    private String id;

    private String user;
    private LocalDateTime created;
    private int score;
}
