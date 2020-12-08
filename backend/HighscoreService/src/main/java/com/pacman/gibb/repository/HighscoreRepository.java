package com.pacman.gibb.repository;

import java.util.List;
import java.util.Optional;

import com.pacman.gibb.model.Highscore;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HighscoreRepository extends MongoRepository<Highscore, String> {
    public List<Highscore> findTop5ByOrderByScoreDesc();
    public Optional<Highscore> findTopByUserOrderByScoreDesc(String user);
}
