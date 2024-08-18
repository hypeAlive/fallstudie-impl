import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {BACKEND_TYPE} from "api-types";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgOptimizedImage, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  protected BackendPictures: Record<BACKEND_TYPE, string> = {
    spring: 'assets/spring_logo.png',
    django: 'assets/django_logo.png',
    express: 'assets/expressjs_logo.png',
  }

  protected pictureUrl: string | undefined = undefined;

  constructor(private http: HttpClient) {
  }

  public static readonly API_URL = 'http://localhost:8080/api';

  ngOnInit(): void {
    this.http.get(AppComponent.API_URL + '/type')
      .subscribe((data: any) => {
        this.pictureUrl = this.BackendPictures[data.type as any as BACKEND_TYPE];
      });
  }
}
