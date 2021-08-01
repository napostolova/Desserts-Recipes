import { HttpClient } from '@angular/common/http';
import {Injectable } from '@angular/core';
import { tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { IUser } from '../shared/interfaces'

const apiUrl = environment.apiUrl;

@Injectable () 
export class UserService { 
    user: IUser | null | undefined;

    get isLogged(): boolean {
        return !!this.user;
    }

    constructor( 
        private http: HttpClient
        ) {}


    login(data: {emai:string; password: string}) {
        return this.http.post<IUser>(`${apiUrl}/login`, data, {withCredentials: true}).pipe(
            tap((user) => this.user = user)
        );
    }
    register(data: {username: string; email: string; password: string}) {
        return this.http.post<IUser>(`${apiUrl}/register`, data).pipe(
            tap((user) => this.user = user)
        );
    }
    logout() {
        return this.http.post<IUser>(`${apiUrl}/logout`, {}, {withCredentials: true}).pipe(
            tap(() => this.user = null)
       );
    } 
}