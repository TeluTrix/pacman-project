package com.pacman.gibb.service;

import com.pacman.gibb.model.FormattedHighscore;
import com.pacman.gibb.model.Highscore;
import com.pacman.gibb.repository.HighscoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HighscoreService {
    private final HighscoreRepository highscoreRepository;

    public List<FormattedHighscore> getTop5Highscores() {
        return highscoreRepository.findTop5ByOrderByScoreDesc()
            .stream()
            .map(this::mapPersonalBest)
            .collect(Collectors.toList());
    }

    public Optional<FormattedHighscore> getHighscoreForUser(String user){
        return highscoreRepository.findTopByUserOrderByScoreDesc(user)
            .map(this::mapPersonalBest);
    }

    public void saveHighscore(Highscore highscore){
        highscore.setCreated(LocalDateTime.now());
        highscoreRepository.save(highscore);
    }

    private FormattedHighscore mapPersonalBest(Highscore highscore) {
        FormattedHighscore personalBest = new FormattedHighscore();
        personalBest.setUser(highscore.getUser());
        personalBest.setScore(highscore.getScore());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss");
        personalBest.setFormattedDateTime(highscore.getCreated().format(formatter));

        return personalBest;
    }
}
