import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Roast tofu',
  //     'Ausome tofu',
  //     'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2535&q=80',
  //     [
  //       new Ingredient('tofu', 2),
  //       new Ingredient('oil', 3),
  //       new Ingredient('greens', 3),
  //     ]
  //   ),
  //   new Recipe(
  //     'Big Fat burger',
  //     'To make your ass really FAT!',
  //     'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2535&q=80',
  //     [
  //       new Ingredient('bread', 1),
  //       new Ingredient('beaf', 1),
  //       new Ingredient('tomato', 0.5),
  //       new Ingredient('French Fries', 20),
  //     ]
  //   ),
  //   new Recipe(
  //     'Spagetti boloneze',
  //     'Better than in Italy!',
  //     'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2535&q=80',
  //     [
  //       new Ingredient('spagetti', 2),
  //       new Ingredient('sous boloneze', 5),
  //       new Ingredient('pepper', 1),
  //     ]
  //   ),
  // ];
  
  constructor(private slService: ShoppingListService, ) {}

  public setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  public getRecipes() {
    return this.recipes.slice();
  }

  public fillShoppingList(ingredients: Ingredient[]) {
    this.slService.addManyToSL(ingredients);
  }

  public getRecipe(id: number): Recipe {
    return this.recipes.slice()[id];
  }

  public addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  public updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());

  }

  public deleteRec(id: number) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
