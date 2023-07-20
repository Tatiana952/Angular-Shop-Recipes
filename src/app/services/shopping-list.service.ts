import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('apple', 5),
    new Ingredient('tomatos', 10),
    new Ingredient('pepper', 3)
  ];
  ingredientAdded = new Subject<Ingredient []>();

  constructor() { }

  public getShoppingList(){
    return this.ingredients.slice();
  }

  public addToShoppingList(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  public addManyToSL(ingredients: Ingredient[]){
    // for (let ingredient of ingredients) {
    //   this.addToShoppingList(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  getIngredient(index:number){
    
  }



}
