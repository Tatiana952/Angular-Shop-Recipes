import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recServ: RecipeService,
    private authServ: AuthServiceService
  ) {}

  storeRecipes() {
    const recipes = this.recServ.getRecipes();
    return this.http
      .put<Recipe[]>(
        'https://ng-recipe-book-da382-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((resp) => {
        console.log(resp);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-recipe-book-da382-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((resp) => {
          return resp.map((resp) => {
            return {
              ...resp,
              ingredients: resp.ingredients ? resp.ingredients : [],
            };
          });
        }),
        tap((resp) => {
          this.recServ.setRecipes(resp);
        })
      );
  }
}
