import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  public startedEditing = new Subject<number>();
  public ingredientsChanged = new Subject<Ingredient[]>();
  public onFormReset = new Subject<void>();
  public onClearClick = new Subject<number>();
  public onIngredientDelete = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Яблоки зеленые', 5, 'шт.'),
    new Ingredient('Помидоры Абхазия', 3, 'шт.'),
    new Ingredient('Перец болгарский', 3, 'шт.'),
  ];

  /**
   * Метод получает копию массива с начальным содержимым списка покупок.
   * @returns Копию массива с начальным содержимым списка покупок
   */
  public getShoppingList(): Ingredient[] {
    return this.ingredients.slice();
  }

  /**
   * Метод добавляет 1 новый ингредиент в список покупок.
   * @param ingredient Ингредиент для добавления
   */
  public addToShoppingList(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  /**
   * Метод добавляет массив ингредиентов в список покупок.
   * @param ingredients Ингредиенты для добавления
   */
  public addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  /**
   * Метод получает ингредиента из списка покупок по индексу.
   * @param index Индекс ингредиента в списке
   * @returns Ингредиент с соответствующим индексом
   */
  public getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  /**
   * Метод перезаписывает ингредиент и его свойства.
   * @param index Индекс ингредиента
   * @param newIngredient Ингредиент с новыми свойствами
   */
  public editIngredient(index: number, newIngredient: Ingredient): void {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  /**
   * Метод удаляет ингредиент из списка покупок.
   * @param index Индекс удаляемого ингредиента
   */
  public deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.onIngredientDelete.next(index);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
