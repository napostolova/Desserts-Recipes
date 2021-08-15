import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from 'src/app/recipes/recipes.service';
import { IRecipe, IUser } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  get userId(): any {
    return this.userService.userId
  }


  recipe: IRecipe | undefined;

  constructor(
    private recipesService: RecipesService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.fetchRecipe();
  }

  ngOnInit() {

  }

  fetchRecipe(): void {
    this.recipe = undefined;
    const id = this.activatedRoute.snapshot.params.recipeId;
    console.log(id);

    this.recipesService.getRecipe(id).subscribe({
      next: (recipe) => {
        this.recipe = recipe
      },
      error: (err) => {
        console.log(err);
      },
    });

  }

  likeRecipe(id: string): void {
    this.recipesService.likeRecipe(id).subscribe({
      next: () => {
        console.log('like');
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  deleteRecipe(id: string): void {
    const confirmation = confirm('Are you sure to delete this recipe?')
    if (confirmation) {
     
    this.recipesService.deleteRecipe(id).subscribe({
      next: () => {
        console.log('delete');
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        console.log(err);

     }
    });
  }
  
  }
}
