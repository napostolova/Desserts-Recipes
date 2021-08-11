import { Component } from '@angular/core';
import { RecipesService } from 'src/app/recipes.service';
import { UserService } from 'src/app/user/user.service';
import { IRecipe } from '../../shared/interfaces/recipe';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css']
})
export class MyRecipesComponent {

   recipes: IRecipe[] | undefined;

  constructor(
    private userService: UserService,
    private recipeService: RecipesService) {

    this.fetchMyRecipes()
  }


  fetchMyRecipes(): void {
    this.recipes = undefined;
    if (this.userService.user) {
      const userId = this.userService.user._id;
      this.recipeService.getMyRecipes(userId).subscribe(recipes => this.recipes = recipes);
    } 
    }

  }

  