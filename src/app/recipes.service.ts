import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IRecipe } from './shared/interfaces';

const apiUrl = environment.apiUrl;

@Injectable()
export class RecipesService {

  constructor(private http: HttpClient) { }

  getRecipe(id: string) {
    return this.http.get<IRecipe>(`${apiUrl}/recipes/${id}`, {withCredentials: true});
  }

  getRecipes() {
    return this.http.get<IRecipe[]>(`${apiUrl}/recipes`, {withCredentials: true});
  }

  createRecipe(data: any) {
    return this.http.post<IRecipe>(`${apiUrl}/recipes`, data, {withCredentials: true});
  }

  getMyRecipes(userId: string) {
    return this.http.get<IRecipe[]>(`${apiUrl}/my-recipes/${userId}/recipes`, {withCredentials: true});
  }

  likeRecipe(id: string) {
    return this.http.get<IRecipe>(`${apiUrl}/likes/${id}`, {withCredentials: true})

  }


}
