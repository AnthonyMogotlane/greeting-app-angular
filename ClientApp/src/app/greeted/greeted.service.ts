import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPerson } from './person';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GreetedService {

  // Api Link
  private greetedNamesUrl: string = "https://localhost:7088/greeted";

  constructor(private http: HttpClient) { }

  getGreetedNames(): Observable<IPerson[]> {
    return this.http.get<IPerson[]>(this.greetedNamesUrl).pipe(
      tap(data => console.log("All", JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  deleteName(id: number): Observable<IPerson[]> {
    return this.http.delete<IPerson[]>(`${this.greetedNamesUrl}/${id}`).pipe(
      tap(data => console.log("All", JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  // Handling error
  private handleError(err: HttpErrorResponse) {
    let errMsg = "";
    if(err.error instanceof ErrorEvent)
      errMsg = "An error occured: " + err.error.message;
    else
      errMsg = `Server returned code: ${err.status}, error message is: ${err.message}` 
    
    console.log(errMsg);
    return throwError(() => errMsg);
  }
}

