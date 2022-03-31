import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {Job} from '../models/Job';
import {SearchJob} from '../models/searchJob';
@Injectable({
  providedIn: 'root',
})
export class JobService {

  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getJob(): Observable<Job[]> {
    return this.http.get<any>(`${this.apiServerUrl}public/user/job/getall`).pipe(
      tap(receivedJob => console.log(`receivedJob=${JSON.stringify(receivedJob)}`)),
    );
  }

  public getJobById(id: number): Observable<any> {
    const url = `${this.apiServerUrl}` + 'public/user/job/' + `${id}`;
    return this.http.get<any>(url).pipe(
      tap(receivedJob => console.log(`receivedJob=${JSON.stringify(receivedJob)}`)),
    );
  }



  public getJobAd(id: number): Observable<any> {
    const url = `${this.apiServerUrl}` + 'public/user/job/detail/' + `${id}`;
    return this.http.get<any>(url);
  }

  public findJob(name, statusJob, salaryMin, salaryMax,page,size): Observable<any> {
    // eslint-disable-next-line max-len
    return this.http.get<any>(`${this.apiServerUrl}`+'public/user/job/searchesT?'+'name='+name+'&statusJob='+statusJob+'&salaryMin='+salaryMin+'&salaryMax='+salaryMax+'&page='+page+'&size='+size).pipe(
      tap(receivedJob => console.log(`receivedJob=${JSON.stringify(receivedJob)}`)),
    );
  }


}
