import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { User } from '../models/user';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root',
})

export class DataService{
  message = '';
  messageType = 'danger';
  user!: User;
  email: string;

  constructor(private router: Router,private rest: RestApiService){
    this.router.events.subscribe(even => {
      if(even instanceof NavigationStart){
        this.message = '';
      }
    });
  }
  error(message: string){
    this.messageType = 'danger';
    this.message = message;
  }
  success(message: string){
    this.messageType = 'success';
    this.message = message;
  }
  warning(message: string){
    this.messageType = 'warning';
    this.message = message;
  }
  setMail(mail: string){
    this.email = mail;
  }
  getMail(){
    return this.email;
  }
}
