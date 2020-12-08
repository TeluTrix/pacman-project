package com.pacman.gibb.controller;

import com.pacman.gibb.model.Highscore;
import com.pacman.gibb.model.FormattedHighscore;
import com.pacman.gibb.service.HighscoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class HighscoreController {

    private final HighscoreService highscoreService;

    @CrossOrigin(origins = "http://localhost:1234")
    @GetMapping("/highscore")
    public List<FormattedHighscore> getTop5Highscores() {
        return highscoreService.getTop5Highscores();
    }

    @CrossOrigin(origins = "http://localhost:1234")
    @GetMapping("/highscore/{user}")
    public ResponseEntity<FormattedHighscore> getHighscoreForUser(@PathVariable String user){
        return highscoreService.getHighscoreForUser(user)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @CrossOrigin(origins = "http://localhost:1234")
    @PostMapping("/highscore")
    public ResponseEntity<Void> postHighscore(@RequestBody Highscore highscore){
        highscoreService.saveHighscore(highscore);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(highscore.getUser())
                .toUri();

        return ResponseEntity.created(location).build();
    }
}
