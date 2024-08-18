import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  question: any;
  selectedOption: string = '';
  result: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getRandomQuestion();
  }

  getRandomQuestion() {
    this.http.get('/api/question').subscribe((data: any) => {
      this.question = data;
      this.selectedOption = '';
      this.result = '';
    });
  }

  submitAnswer() {
    this.http.post('/api/question', { id: this.question.id, answer: this.selectedOption })
      .subscribe((data: any) => {
        this.result = data.isCorrect ? 'Correct!' : 'Incorrect!';
      });
  }
}
