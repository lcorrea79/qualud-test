
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import {  throwError } from 'rxjs';

import { User } from '../model/user';



@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    isLogin = false
    
   

    //private REST_API_SERVER = environment.REST_API_SERVER;

    httpOptions = {
     headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(p_user: User) {
      
      localStorage.setItem('currentUser', JSON.stringify(p_user));
      localStorage.setItem('STATE', 'true');
       
    }

    updateCurrentUser(p_user:User){
      localStorage.setItem('currentUser', JSON.stringify(p_user));
      this.currentUserSubject.next(p_user);
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        localStorage.setItem('STATE', 'false');
        //this.currentUserSubject.next({});
    }

    isLoggedIn() {
        const loggedIn = localStorage.getItem('STATE');
        if (loggedIn == 'true')
          this.isLogin = true;
        else
          this.isLogin = false;
        return this.isLogin;
      }
    
      

    errorHandler(error: any) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        
        return throwError(errorMessage);
     }
}