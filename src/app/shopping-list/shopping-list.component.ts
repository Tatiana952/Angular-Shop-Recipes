import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from '../core/shopping-list.service';
import { Subscription } from 'rxjs';
import { slidingLeftAnimation } from '../shared/animations';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [slidingLeftAnimation],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  @ViewChild('ulList') ulList;
  public isEditMode: boolean = false;
  public ingredients: Ingredient[] = [];

  private subscriptionIngredientsChanged: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getShoppingList();
    this.subscriptionIngredientsChanged =
      this.shoppingListService.ingredientsChanged.subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  ngOnDestroy(): void {
    this.subscriptionIngredientsChanged.unsubscribe();
  }

  /**
   * Удаляет ингредиент из списка покупок.
   * @param i Индекс удаляемого ингредиента
   */
  public onDeleteIngredient(i: number): void {
    this.shoppingListService.deleteIngredient(i);
  }
}
