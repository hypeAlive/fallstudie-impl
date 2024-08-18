import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {QuestionComponent} from "./question/question.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'question',
    component: QuestionComponent
  }
];
