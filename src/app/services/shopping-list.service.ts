import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  public startedEditing = new Subject<number>();
  public ingredientsChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Яблоки зеленые', 5, 'шт.'),
    new Ingredient('Помидоры Абхазия', 3, 'шт.'),
    new Ingredient('Перец болгарский', 3, 'шт.'),
  ];

  public getShoppingList() {
    return this.ingredients.slice();
  }

  public addToShoppingList(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  public addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  public getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  public editIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  public deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
