import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getRandomQuestion();
  }

  getRandomQuestion() {

  }

  submitAnswer() {
  }
}
