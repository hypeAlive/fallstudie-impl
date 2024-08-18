import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppComponent} from "../app.component";
import {firstValueFrom} from "rxjs";
import {AnswerRes, AnswerType, QuestionHidden} from "api-types";
import {NgClass, NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {QuestionOption} from "api-types/dist/quiz.type";

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    NgTemplateOutlet
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit{

  private static QUESTIONS: number[] | undefined = undefined;

  protected question: QuestionHidden | undefined = undefined;
  protected selectedAnswer: AnswerType | undefined = undefined;
  protected isCorrect: boolean | undefined = undefined;
  protected isLoading: boolean = true;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    if (QuestionComponent.QUESTIONS === undefined) {
      firstValueFrom<number[]>(this.http.get<number[]>(AppComponent.API_URL + '/question/ids'))
        .then(r => {
          QuestionComponent.QUESTIONS = r;
          this.requestRandomQuestions();
        })
    } else {
      this.requestRandomQuestions();
    }
  }

  protected requestRandomQuestions(): void {
    this.isLoading = true;
    this.question = undefined;
    this.selectedAnswer = undefined;
    this.isCorrect = undefined;
    firstValueFrom<QuestionHidden>(this.http.get<QuestionHidden>(AppComponent.API_URL + '/question/' + QuestionComponent.QUESTIONS![Math.floor(Math.random() * QuestionComponent.QUESTIONS!.length)]))
      .then(r => {
        this.question = r;
        this.isLoading = false;
        console.log(r);
      });
  }

  protected onOptionSelected(option: QuestionOption): void {
    this.selectedAnswer = option.type;
  }

  protected submitAnswer(): void {
    if(!this.selectedAnswer || !this.question) return;

    const checkId = this.question.id;
    this.question = undefined;
    this.isLoading = true;

    firstValueFrom<AnswerRes>(this.http.post<AnswerRes>(AppComponent.API_URL + '/question', {
      id: checkId,
      answer: this.selectedAnswer
    }))
      .then(r => {
        console.log(r);
        this.isCorrect = r.isCorrect;
        this.isLoading = false;
      });
  }
}
