// example.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL: string = 'http://localhost:12000'
  constructor(private http: HttpClient) { }

  userLogin(username: string, password: string): Observable<any> {
    const url = this.baseURL+'/login';
    const body = { username, password };
    return this.http.post(url, body);
  }

  userSignUp(username: string, password: string): Observable<any> {
    const url = this.baseURL+'/signup';
    const body = { username, password };
    return this.http.post(url, body);
  }

  postData(data: any) {
    return this.http.post('http://localhost/endpoint', data);
  }
}