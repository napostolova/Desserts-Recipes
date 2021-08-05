import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllRecipesComponent } from './all-recipes/all-recipes.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { RecipeComponent } from './recipe/recipe.component';

const routes: Routes = [
    {
        path: 'recipes',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: AllRecipesComponent
            },
            // {
            //     path:':recipeId',
            //     component: RecipeComponent
 
            // }
        ]
    },
     {
        path: 'recipes/create',
        component: NewRecipeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipeRoutingModule { }