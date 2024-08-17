export type AnswerType = 'a' | 'b' | 'c';

export type QuestionData = QuestionHidden & {
    answers: AnswerType;
}

export type QuestionHidden = {
    id: number;
    question: string;
}

export type AnswerReq = {
    id: number;
    answer: AnswerType;
}

export type AnswerRes = {
    id: number;
    isCorrect: boolean;
}