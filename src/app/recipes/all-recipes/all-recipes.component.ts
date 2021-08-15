import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/recipes/recipes.service';
import { IRecipe } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/user/user.service';

import { NgbPagination} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.css']
})
export class AllRecipesComponent implements OnInit {
  get isLogged(): boolean {
    return this.userService.isLogged;
  }
 
  recipes: IRecipe[] | undefined;
  page = 1;
  pageSize = 3;
  collectionSizes = 0;

  constructor(
    private recipesService: RecipesService,
    private userService: UserService
  ) {   }
  
   ngOnInit(): void {
    this.fetchRecipes();     
  }  

  fetchRecipes(): void {
      this.recipesService.getRecipes().subscribe(response => {
        this.recipes = response;  
  },
  error => {
    console.log(error);
  });

}



}
