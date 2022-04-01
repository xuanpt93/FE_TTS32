import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {jobRegisterModel} from '../models/jobRegister.model';

@Injectable({
  providedIn: 'root'
})
export class JobRegisterServiceService {
  private readonly baseUrl = `${environment.apiUrl}public/jobRegister`;

  constructor(private http: HttpClient) { }

  getAll():Observable<jobRegisterModel[]>{
    return this.http.get<jobRegisterModel[]>(this.baseUrl).pipe();
  }
}
