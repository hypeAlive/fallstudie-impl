package de.alive.example.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import lombok.Getter;

import java.lang.reflect.Type;
import java.util.List;

public class Question {
    @Getter
    private int id;
    private String question;
    private List<QuestionOption> options;
    private char answers;

    protected static class QuestionOption {
        @JsonProperty
        private char type;
        @JsonProperty
        private String text;

        protected QuestionOption(char option, String text){
            this.type = option;
            this.text = text;
        }
    }

    public static class AnswerRes {
        @JsonProperty
        private int id;
        @JsonProperty
        private boolean isCorrect;

        protected AnswerRes(int id, boolean isCorrect){
            this.id = id;
            this.isCorrect = isCorrect;
        }
    }

    public static class AnswerReq {
        @JsonProperty
        @Getter
        private int id;
        @JsonProperty
        @Getter
        private char answer;

        public AnswerReq(int id, char answer){
            this.answer = answer;
            this.id = id;
        }
    }

    public static class QuestionHidden {
        @JsonProperty
        private int id;
        @JsonProperty
        private String question;
        @JsonProperty
        private List<QuestionOption> options;

        protected QuestionHidden(int id, String question, List<QuestionOption> options){
            this.question = question;
            this.options = options;
            this.id = id;
        }
    }

    public QuestionHidden getHidden(){
        return new QuestionHidden(id, question, options);
    }

    public boolean isCorrect(char answer) {
        return this.answers == answer;
    }

    public AnswerRes checkAnswer(char answer) {
        return new AnswerRes(id, isCorrect(answer));
    }

    public static List<Question> fromJson(String json) {
        Type listType = new TypeToken<List<Question>>() {}.getType();
        return new Gson().fromJson(json, listType);
    }
}