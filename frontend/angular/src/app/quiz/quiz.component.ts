import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {BACKEND_TYPE} from "api-types";

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    NgClass
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {

  protected BackendPictures: Record<BACKEND_TYPE, string> = {
    spring: 'assets/spring_logo.png',
    django: 'assets/django_logo.png',
    express: 'assets/expressjs_logo.png',
  }

  protected pictureUrl: string | undefined = undefined;

  private static readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get(QuizComponent.API_URL + '/type')
      .subscribe((data: any) => {
        this.pictureUrl = this.BackendPictures[data.type as any as BACKEND_TYPE];
      });
  }

  getRandomQuestion() {

  }

  submitAnswer() {
  }
}
