package com.pacman.gibb.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Highscore {
    @Id
    private String user;
    private int score;
}
