// example.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ImageClasificationService {
  baseURL: string = 'http://localhost:12000'
  constructor(private http: HttpClient) { }

  imageUpload(username: string, password: string): Observable<any> {
    const url = this.baseURL+'/upload';
    const body = { username, password };
    return this.http.post(url, body);
  }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    const url = this.baseURL+'/upload';
    formData.append('file', file);
    return this.http.post<any>(url, formData);
  }
}