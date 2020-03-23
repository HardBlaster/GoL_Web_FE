import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

@Injectable()
export class RestAPI {
  baseURL = 'localhost:8080';

  constructor(private http: HttpClient) { }

  public getNextGen() {
    return this.http.get(this.baseURL + '/simulation/getNextGen');
  }

  public getCurrentGen() {
    return this.http.get(this.baseURL + '/simulation/getCurrentGen');
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
