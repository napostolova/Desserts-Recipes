import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRecipe } from '../shared/interfaces';

@Injectable()
export class RecipesService {

  constructor(private http: HttpClient) { }

  getRecipe(id: string) {
    return this.http.get<IRecipe>(`/api/recipes/${id}`);
  }

  getRecipes() {
    return this.http.get<IRecipe[]>(`/api/recipes`);
  }

  createRecipe(data: any) {
    return this.http.post<IRecipe>(`/api/recipes`, data);
  }

  getMyRecipes(userId: string) {
    return this.http.get<IRecipe[]>(`/api/my-recipes/${userId}/recipes`);
  }

  likeRecipe(id: string) {
    return this.http.get<IRecipe>(`/api/likes/${id}`)
  }

  editRecipe(data: any, id: string) {
    return this.http.put<IRecipe>(`/api/recipes/${id}`, data )
  }

  deleteRecipe(id: string) {
    return this.http.delete<IRecipe>(`/api/recipes/${id}`)
  }


}
