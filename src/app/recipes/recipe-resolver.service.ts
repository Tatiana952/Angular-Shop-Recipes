import {
  ResolveFn,
} from '@angular/router';
import { Recipe } from '../shared/models/recipe.model';
import { DataStorageService } from '../core/data-storage.service';
import { inject } from '@angular/core';

import { RecipeService } from '../core/recipe.service';

/**
 * Resolver для предварительной загрузки списка рецептов.
 * @returns Список рецептов
 */
export const resolveRecipes: ResolveFn<Recipe[]> = () => {
  let recipes = inject(RecipeService).getRecipes();
  if (recipes.length === 0) {
    return inject(DataStorageService).fetchRecipes();
  }
  return recipes;
};
