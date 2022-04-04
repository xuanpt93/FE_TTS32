import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { USERNAME_KEY, USER_ID_KEY, USER_ROLE_KEY } from '../models/config/local-storage-keys';

@Injectable({
  providedIn: 'root',
})

export class RestApiService{
  constructor(private http: HttpClient, private router: Router){}

  getHeaders(){
    const token = localStorage.getItem('token');
    return token? new HttpHeaders().set('Authorization','Bearer '+ token):null;
  };
  get(link: string){
    return this.http.get(link).toPromise();
  }
  getOne(link: string, id: string){
    // let headers = this.getHeaders();
    // if(headers instanceof HttpHeaders)
    // return this.http.get(link + '/'+id,{headers:headers}).toPromise();

    return this.http.get(link + '/'+id).toPromise();
  }

  post(link: string, body: any){
    // let headers = this.getHeaders();
    // if(headers instanceof HttpHeaders)
    // return this.http.post(link,body,{headers:headers}).toPromise();
    return this.http.post(link,body).toPromise();
  }

  put(link: string,body: any){
    let headers = this.getHeaders();
    if(headers instanceof HttpHeaders){
      return this.http
      .put(link + '?otpCode='+body.otpCode+'&password=' + body.password,body,{headers:headers})
      .toPromise();
    }


    return this.http.put(link +'?otpCode='+body.otpCode+'&password=' + body.password,body).toPromise();
  }

  delete(link: string, id: string){
    let headers = this.getHeaders();
    if(headers instanceof HttpHeaders){
      return this.http.delete(link + '/'+id,{headers:headers}).toPromise();
    }
    return this.http.delete(link + '/'+id).toPromise();
  }
  logout(): void {
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(USER_ROLE_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
