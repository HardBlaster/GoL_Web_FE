import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {InitData} from '../shared/InitData';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

const jsonHeader = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class InitDataService {
  baseURL = 'http://localhost:8080/simulator/';
  initDataURL = 'initData/';

  constructor(private http: HttpClient) { }

  postInitData(initData: InitData): Observable<InitData> {
    return this.http.post<InitData>(this.baseURL + this.initDataURL, JSON.stringify(initData), jsonHeader)
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
