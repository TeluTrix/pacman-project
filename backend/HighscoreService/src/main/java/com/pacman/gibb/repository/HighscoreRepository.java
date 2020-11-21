package com.pacman.gibb.repository;

import com.pacman.gibb.model.Highscore;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HighscoreRepository extends MongoRepository<Highscore,String> {
}
