package de.alive.example.controller;

import de.alive.example.model.Question;
import de.alive.example.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @GetMapping("/")
    public String home() {
        return "Example CaseStudy API for Spring!";
    }

    @GetMapping("/type")
    public String getBackendType() {
        return "{\"type\": \"spring\"}";
    }

    @GetMapping("/question")
    public List<Question.QuestionHidden> getQuestions() {
        return questionService.getAllQuestions().stream().map(Question::getHidden).toList();
    }

    @GetMapping("/question/ids")
    public List<Integer> getQuestionIds() {
        return questionService.getAllQuestionIds();
    }


    @GetMapping("/question/{id}")
    public Question.QuestionHidden getQuestionById(@PathVariable int id) {
        return questionService.getQuestionById(id).getHidden();
    }

    @PostMapping("/question")
    public Question.AnswerRes checkAnswer(@RequestBody int id, @RequestBody char answer) {
        return questionService.checkAnswer(id, answer);
    }
}