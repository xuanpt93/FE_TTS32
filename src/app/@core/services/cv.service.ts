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

  public formData = new FormData();

  download(file: string | undefined): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download/${file}`, {
      responseType: 'blob',
    });
  }

  upload(file: File, user_id, job_id): Observable<HttpEvent<any>> {
    this.resetForm();
    this.formData.append('file', file);
    this.formData.append('user_id',user_id);
    this.formData.append('job_id', job_id);
    console.log(this.formData);
    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, this.formData, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }
  getFile(): Observable<any>{
    return this.http.get(`${this.baseUrl}/upload`);
  }
  resetForm() {
    this.formData = new FormData();
  }
}
