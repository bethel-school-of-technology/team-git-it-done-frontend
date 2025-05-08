import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { jwtDecode } from 'jwt-decode';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL: string = 'http://localhost:5072/api/Auth';

  constructor(private http: HttpClient, private router: Router) {}

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

        tap((response: string) => {
          const decodedToken: any = jwtDecode(response);

          const firstName = decodedToken.given_name; // read from JWT payload
          const lastName = decodedToken.family_name;

          localStorage.setItem('myBillToken', response);
          localStorage.setItem('fullName', `${firstName} ${lastName}`);
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

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.router.navigate(['/sign-in']);
  }

  getBibleVerse(): Observable<string> {
    return this.http.get('https://beta.ourmanna.com/api/v1/get/?format=text', {
      responseType: 'text'
    });
  }

}
