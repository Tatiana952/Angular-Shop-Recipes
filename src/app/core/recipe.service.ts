import { Injectable } from '@angular/core';
import { Recipe } from '../shared/models/recipe.model';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

/**
 * Сервис управляющий локальным списком рецептов
 */
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  public recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  /**
   * Устанавливает значение локальной переменной равное массиву рецептов.
   * @param recipes Массив рецептов
   */
  public setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  /**
   * Получает массив рецептов.
   * @returns Копия массива рецептов
   */
  public getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  /**
   * Добавляет ингредиенты рецепта в список покупок.
   */
  public fillShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredientsToShoppingList(ingredients);
  }

  /**
   * Получает рецепт из массива по его индексу.
   * @param id Индекс рецепта в массиве
   * @returns Рецепт по указанному индексу
   */
  public getRecipe(id: number): Recipe {
    return this.recipes.slice()[id];
  }

  /**
   * Добавляет новый рецепт в массив рецептов.
   * @param recipe Новый рецепт
   */
  public addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  /**
   * Обновляет существующий рецепт из массива рецептов.
   * @param index Индекс рецепта в массиве
   * @param recipe Рецепт с новым описанием
   */
  public updateRecipe(index: number, recipe: Recipe): void {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  /**
   * Удаляет рецепт в пределах приложения.
   * @param id Индекс удаляемого рецепта в массиве рецептов
   */
  public deleteRecipe(id: number): void {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
