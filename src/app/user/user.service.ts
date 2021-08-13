import { trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import {Injectable } from '@angular/core';
import { tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { IUser } from '../shared/interfaces'


@Injectable () 
export class UserService { 
    user: IUser | null | undefined;

    get isLogged(): boolean {
        return !!this.user;
        
    }
    get userId(): any {
        return this.user?._id;
    }
    
    constructor( 
        private http: HttpClient
        ) {}


    login(data: {emai:string; password: string}) {
        return this.http.post<IUser>(`/api/login`, data).pipe(
            tap((user) => this.user = user)           
        );
    }
    register(data: {username: string; email: string; password: string}) {
        return this.http.post<IUser>(`/api/register`, data).pipe(
            tap((user) => this.user = user)
        );
    }
    logout() {
        return this.http.post<IUser>(`/api/logout`, {}).pipe(
            tap(() => this.user = null)
       );
    } 
    userProfile() {
        return this.http.get<IUser>(`/api/users/profile`).pipe(
            tap((user) => this.user = user)
        )
    }
  
}