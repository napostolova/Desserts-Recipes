import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGardGuard } from '../core/guards/auth-gard.guard';
import { AllRecipesComponent } from './all-recipes/all-recipes.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { RecipeComponent } from './recipe/recipe.component';

const routes: Routes = [
    {
        path: 'recipes',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: AllRecipesComponent,
                canActivate: [AuthGardGuard],
                data: {
                    authenticationRequired: true,
                    authenticationFailureRedirect: '/login'
                }
            },
            {
                path:':recipeId',
                component: RecipeComponent,
                canActivate: [AuthGardGuard],
                data: {
                    authenticationRequired: true,
                    authenticationFailureRedirect: '/login'
                }
 
            }
        ]
    }, 
    {   path: 'create',
        component: NewRecipeComponent,
        canActivate: [AuthGardGuard],
        data: {
            authenticationRequired: true,
            authenticationFailureRedirect: '/login'
        }
    },
    {
        path: 'my-recipes',
        component: MyRecipesComponent,
        canActivate: [AuthGardGuard],
        data: {
            authenticationRequired: true,
            authenticationFailureRedirect: '/login'
        }
    },
    {
        path: 'edit/:id',
        component: EditRecipeComponent,
        canActivate: [AuthGardGuard],
        data: {
            authenticationRequired: true,
            authenticationFailureRedirect: '/login'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipeRoutingModule { }