import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: '<button class="btn btn-active btn-primary min-w-60 mt-4" (click)="navigateToQuestion()">Start</button>'
})
export class HomeComponent {

  constructor(private router: Router) {
  }

  protected navigateToQuestion(): void {
    this.router.navigate(['/question']).then(r => {});
  }

}
