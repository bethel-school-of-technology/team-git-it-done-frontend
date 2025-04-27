import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { jwtDecode } from 'jwt-decode';

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
        })
      );
  }
}
