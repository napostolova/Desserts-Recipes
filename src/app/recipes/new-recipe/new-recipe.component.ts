import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent {

  constructor(
    private recipeService: RecipesService,
    private router: Router
  ) { }

  createRecipe(form: NgForm): void{
    if(form.invalid) { return; }
    this.recipeService.createRecipe(form.value).subscribe({
      next: () => {
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
