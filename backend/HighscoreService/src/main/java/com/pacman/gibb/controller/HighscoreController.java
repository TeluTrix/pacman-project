package com.pacman.gibb.controller;

import com.pacman.gibb.model.Highscore;
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

    @GetMapping("/highscore")
    public List<Highscore> getHighscore() {
        return highscoreService.getAll();
    }

    @GetMapping("/highscore/{user}")
    public ResponseEntity<Highscore> getHighscoreForUser(@PathVariable String user){
        return highscoreService.getHighscoreForUser(user)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

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
