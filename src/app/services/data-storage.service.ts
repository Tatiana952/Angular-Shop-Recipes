import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from '../shared/models/recipe.model';
import { Observable, Subscription, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  /**
   * Метод сохранения списка рецептов в базу данных Firebase
   * @returns Subscription потока
   */
  public storeRecipes(): Subscription {
    const recipes = this.recipeService.getRecipes();
    return this.http
      .put<Recipe[]>(
        'https://ng-recipe-book-da382-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe();
  }

  /**
   * Метод загрузки списка рецептов из базы данных Firebase.
   * @returns Observable типа Recipe[] со списком рецептов
   */
  public fetchRecipes(): Observable<Recipe[]> {
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
          this.recipeService.setRecipes(resp);
        })
      );
  }
}
