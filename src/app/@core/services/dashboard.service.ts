import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  private baseUrl = `${environment.apiUrl}public/dashboard`;
  private baseUrlLineChart = `${environment.apiUrl}public/lineChart`;

  constructor(private http: HttpClient) {};

  getStatistic(date: any): Observable<any>{
    console.log(date);
    return this.http.post<any>(this.baseUrl,date).pipe();
  }

  getDataLineChart(data: any): Observable<any>{
    console.log(data);
    return this.http.post<any>(this.baseUrlLineChart,data).pipe();
  }
}
