import {Router} from "express";
import {AnswerReq, AnswerRes} from "api-types";
import Question from "../model/Question.js";
import fs from 'fs';
import path from 'path';
import {LOGGER} from "../main.js";
const dataPath = path.resolve('../data.json');

let questions: Question[] = [];

try {
    const data = fs.readFileSync(dataPath, 'utf8');
    questions = Question.fromJson(JSON.parse(data));
    LOGGER.info('JSON file read');
} catch (err) {
    LOGGER.error('Error while reading JSON file');
    console.error(err);
}

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
    LOGGER.info('Question data sent');
});

router.post("/question", (req, res) => {

    const answer: AnswerReq = req.body;

    const question = questions.find((question) => question.getId() === answer.id);

    if (!question) {
        res.status(404)
            .send("Question not found");
        LOGGER.error('Question not found');
        return;
    }

    res.status(200)
        .send({
            id: question.getId(),
            isCorrect: question.isCorrect(answer.answer)
        } as AnswerRes
        );

    LOGGER.info('Answer data sent');
});