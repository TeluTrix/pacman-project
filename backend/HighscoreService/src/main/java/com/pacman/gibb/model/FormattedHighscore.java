package com.pacman.gibb.model;

import lombok.Data;

@Data
public class FormattedHighscore {
    private String user;
    private int score;
    private String formattedDateTime;
    
}
