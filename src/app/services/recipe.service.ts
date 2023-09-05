import { Injectable } from '@angular/core';
import { Recipe } from '../shared/models/recipe.model';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  public recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  /**
   * Метод устанавливает значение массива рецептов.
   * @param recipes Массив рецептов
   */
  public setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  /**
   * Метод получает массива рецептов.
   * @returns Копия массива рецептов
   */
  public getRecipes() {
    return this.recipes.slice();
  }

  /**
   * Метод добавляет ингредиенты рецепта в список покупок
   */
  public fillShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredientsToShoppingList(ingredients);
  }

  /**
   * Метод получает рецепт из массива по его индексу
   * @param id Индекс рецепта в массиве
   * @returns Рецепт по указанному индексу
   */
  public getRecipe(id: number): Recipe {
    return this.recipes.slice()[id];
  }

  /**
   * Метод добавляет новый рецепт в массив рецептов
   * @param recipe Новый рецепт
   */
  public addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  /**
   * Метод обновляет существующий рецепт из массива рецептов
   * @param index Индекс рецепта в массиве
   * @param recipe Новое содержимое рецепта
   */
  public updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  /**
   * Метод удаляет рецепт
   * @param id Индекс удаляемого рецепта в массиве рецептов
   */
  public deleteRec(id: number) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
