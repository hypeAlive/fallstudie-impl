import {AnswerType, QuestionData, QuestionHidden} from "api-types";

export default class Question {
    private data: QuestionData;

    constructor(data: QuestionData) {
        this.data = data;
    }

    public getId(): number {
        return this.data.id;
    }

    public getHidden(): QuestionHidden {
        return {
            id: this.data.id,
            question: this.data.question,
        };
    }

    public isCorrect(answer: AnswerType): boolean {
        return this.data.answers === answer;
    }

    public static fromJson(json: any): Question[] {
        return json.map((data: QuestionData) => new Question(data));
    }
}