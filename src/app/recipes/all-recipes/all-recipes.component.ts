import { Component } from '@angular/core';
import { RecipesService } from 'src/app/recipes.service';
import { IRecipe } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.css']
})
export class AllRecipesComponent {
  get isLogged(): boolean {
    return this.userService.isLogged;
  }
 
  recipes: IRecipe[] | undefined;

  constructor(
    private recipesService: RecipesService,
    private userService: UserService
  ) {
    this.fetchRecipes();
   }
  
  fetchRecipes(): void {
    this.recipes = undefined;
    this.recipesService.getRecipes().subscribe(recipes => this.recipes = recipes);
  }
 

}
