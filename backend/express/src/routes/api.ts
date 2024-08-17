import {Router} from "express";
import {AnswerReq, AnswerRes} from "api-types";
import Question from "../model/Question.js";
import data from "../../../data.json";

const questions: Question[] = Question.fromJson(data);

export const router = Router();

router.get("/", (req, res) => {
    res.send("Example CaseStudy API for express!");
});

router.get("/question", (req, res) => {
    res.status(200)
        .send(questions
            .map((question) => question.getHidden()
            )
        );
});

router.post("/question", (req, res) => {

    const answer: AnswerReq = req.body;

    const question = questions.find((question) => question.getId() === answer.id);

    if (!question) {
        res.status(404)
            .send("Question not found");
        return;
    }

    res.status(200)
        .send({
            id: question.getId(),
            isCorrect: question.isCorrect(answer.answer)
        } as AnswerRes
        );
});