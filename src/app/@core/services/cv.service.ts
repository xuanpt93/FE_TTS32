import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
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
}
