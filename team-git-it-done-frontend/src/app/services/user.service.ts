import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { jwtDecode } from 'jwt-decode';
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
        tap((response: string) => {
          const decodedToken: any = jwtDecode(response);

          const firstName = decodedToken.given_name; // read from JWT payload
          const lastName = decodedToken.family_name;

          localStorage.setItem('myBillToken', response);
          localStorage.setItem('fullName', `${firstName} ${lastName}`);
          localStorage.setItem(
            'img',
            decodedToken.profile_picture ||
              'https://i.pinimg.com/originals/c0/9b/6d/c09b6d7edb7b4b89b382aa6ca0a761de.jpg'
          );
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

  UploadProPic(userId: number, img: string): Observable<any> {
    return this.http.post(`${this.baseURL}/upload-pro-pic`, { userId, img });
  }

  UpdateProPic(userId: number, img: string): Observable<any> {
    return this.http.post(`${this.baseURL}/update-pro-pic`, { userId, img });
  }
}
