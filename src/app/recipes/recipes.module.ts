import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { AllRecipesComponent } from './all-recipes/all-recipes.component';
import { RecipeRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RecipeComponent } from './recipe/recipe.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

@NgModule({
  declarations: [
    NewRecipeComponent,
    AllRecipesComponent,
    RecipeComponent,
    MyRecipesComponent,
    EditRecipeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RecipeRoutingModule
  ]
})
export class RecipesModule { }
