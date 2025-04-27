import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL: string = 'http://localhost:5072/api/Auth';

  constructor(private http: HttpClient) {}

  signUp(newUser: User) {
    return this.http.post(`${this.baseURL}/register`, newUser);
  }

  login(email: string, password: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('email', email);
    queryParams = queryParams.append('password', password);

    return this.http
      .get(`${this.baseURL}/login`, {
        params: queryParams,
        responseType: 'text',
      })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('myBillToken', response);
        })
      );
  }

  getUserIdFromEmail(email: string): Observable<number> {
    return this.http
      .get<number>(`${this.baseURL}/user`, { params: { email } })
      .pipe(
        catchError((error) => {
          alert('This email does not exist in our database');
          return throwError(() => new Error('Failed to fetch user ID'));
        })
      );
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseURL}/user/${userId}`);
  }
}
