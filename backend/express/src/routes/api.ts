import {Router} from "express";
import {AnswerReq, AnswerRes} from "api-types";
import Question from "../model/Question.js";
import fs from 'fs';
import path from 'path';
import {LOGGER} from "../main.js";
import {BACKEND_TYPE} from "api-types/dist/quiz.type.js";
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

router.get("/type", (req, res) => {
   res.status(200).send('express' as BACKEND_TYPE);
});

router.get("/question", (req, res) => {
    res.status(200)
        .send(questions
            .map((question) => question.getHidden()
            )
        );
    LOGGER.info('Question data sent');
});

router.get("/question/ids", (req, res) => {
    res.status(200).send(questions.map((question) => question.getId()));
});

router.get("/question/:id", (req, res) => {
    const id = Number(req.params.id);
    if(isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }
    const question = questions.find((question) => question.getId() === id);
    if(!question) {
        res.status(404).send('Question not found');
        return;
    }
    res.status(200).send(question);
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