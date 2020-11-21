package com.pacman.gibb.service;

import com.pacman.gibb.model.Highscore;
import com.pacman.gibb.repository.HighscoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HighscoreService {
    private final HighscoreRepository highscoreRepository;

    public List<Highscore> getAll() {
        return highscoreRepository.findAll();
    }

    public Optional<Highscore> getHighscoreForUser(String user){
        return highscoreRepository.findById(user);
    }

    public void saveHighscore(Highscore highscore){
        highscoreRepository.save(highscore);
    }

}
