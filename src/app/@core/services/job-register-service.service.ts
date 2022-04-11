import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {jobRegisterModel} from '../models/jobRegister.model';
import {jobRegisterDTOModel} from "../models/jobRegisterDTO.model";

@Injectable({
  providedIn: 'root'
})
export class JobRegisterServiceService {
  private readonly baseUrl = `${environment.apiUrl}public/jobRegister/`;

  constructor(private http: HttpClient) { }

  getAll():Observable<jobRegisterModel[]>{
    return this.http.get<jobRegisterModel[]>(this.baseUrl).pipe();
  }

  getById(id: number): Observable<jobRegisterModel>{
    return this.http.get<jobRegisterModel>(`http://localhost:9090/api/public/jobRegister/` + `${id}`).pipe();
  }

  public sendEmailInterview(form: any): Observable<any>{
    return this.http.post(`${this.baseUrl}sendMail`, form);
  }

  changeStatus(id: number, form: any): Observable<jobRegisterModel>{
    return this.http.post<jobRegisterModel>(`http://localhost:9090/api/public/jobRegister/` + `${id}`, form);
  }

  search(form: any, page, size): Observable<jobRegisterModel>{
    return this.http.post<jobRegisterModel>(`${this.baseUrl}` + 'search?pageIndex='+page+'&pageSize='+size
      ,form).pipe();
  }

  create(form: any):Observable<any>{
    return this.http.post(`${this.baseUrl}create`, form).pipe();
  }
}
