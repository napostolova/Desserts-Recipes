import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from 'src/app/recipes.service';
import { IRecipe } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  recipe: IRecipe | undefined;

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.fetchRecipe();
   }

  ngOnInit(): void {
  }

  fetchRecipe(): void { 
    this.recipe = undefined;
    const id = this.activatedRoute.snapshot.params.id;
  this.recipesService.getRecipe(id).subscribe(recipe => this.recipe = recipe);
  }

  editRecipe(form: NgForm): void {
    const id = this.activatedRoute.snapshot.params.id
    if(form.invalid) { return; }
    this.recipesService.editRecipe(form.value, id).subscribe({
      next: () => {
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        console.log(err);
      }
    })

  }
}
