import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {
  baseURL = 'http://localhost:8080/simulator/';
  generateURL = 'generate/';
  nextGenURL = 'getNextGen/';

  constructor(private http: HttpClient) { }

  putGenerate(): Observable<number[][]> {
    return this.http.get<number[][]>(this.baseURL + this.generateURL)
      .pipe(catchError(this.handleError));
  }

  getNextGen(): Observable<number[][]> {
    return this.http.get<number[][]>(this.baseURL + this.nextGenURL)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
