package de.alive.example.service;

import de.alive.example.model.Question;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Service
public class QuestionService {
    private static final Logger logger = LoggerFactory.getLogger(QuestionService.class);
    private List<Question> questions;

    @PostConstruct
    public void init() {
        try {
            String relativePath = "../../data.json";
            String absolutePath = Paths.get(relativePath).toAbsolutePath().toString();
            String data = new String(Files.readAllBytes(Paths.get(relativePath)));
            questions = Question.fromJson(data);
            logger.info("Loaded {} questions", questions.size());
        } catch (IOException e) {
            String absolutePath = Paths.get("../../data.json").toAbsolutePath().toString();
            logger.error("Failed to load questions from path: {}", absolutePath, e);
        }
    }

    public List<Question> getAllQuestions() {
        return questions;
    }

    public List<Integer> getAllQuestionIds() {
        return questions.stream().map(Question::getId).toList();
    }

    public Question getQuestionById(int id) {
        return questions.stream().filter(q -> q.getId() == id).findFirst().orElse(null);
    }

    public Question.AnswerRes checkAnswer(int id, char answer) {
        Question question = getQuestionById(id);
        return question.checkAnswer(answer);
    }
}