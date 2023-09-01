import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Яблоки зеленые', 5),
    new Ingredient("Помидоры Абхазия", 10),
    new Ingredient('Перец болгарский', 3),
  ];
  ingredientsChanged = new Subject<Ingredient[]>();

  constructor() {}

  public getShoppingList() {
    return this.ingredients.slice();
  }

  public addToShoppingList(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  public addManyToSL(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addToShoppingList(ingredient);
    // }
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
