import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from 'src/app/recipes.service';
import { IRecipe } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent  {

  recipe: IRecipe | undefined;

  constructor(
    private recipesService: RecipesService,
    private activatedRoute: ActivatedRoute
  ) { 
     this.fetchRecipe();
  }


  fetchRecipe(): void {
    this.recipe = undefined;
    const id = this.activatedRoute.snapshot.params.recipeId;
    console.log(id);
    
    this.recipesService.getRecipe(id).subscribe(recipe => this.recipe = recipe);
  }


}
