import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CvService {

  private baseUrl = `${environment.apiUrl}public/file`;

  constructor(private http: HttpClient) {}

  download(file: string | undefined): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download/${file}`, {
      responseType: 'blob',
    });
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }
  getFile(): Observable<any>{
    return this.http.get(`${this.baseUrl}/upload`);
  }
}
