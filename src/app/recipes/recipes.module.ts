import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { AllRecipesComponent } from './all-recipes/all-recipes.component';
import { RecipeRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RecipeComponent } from './recipe/recipe.component';



@NgModule({
  declarations: [
    NewRecipeComponent,
    AllRecipesComponent,
    RecipeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RecipeRoutingModule
  ]
})
export class RecipesModule { }
