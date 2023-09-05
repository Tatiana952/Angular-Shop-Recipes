import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { Subject, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { slidingLeftAnimation } from '../shared/animations';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [],
  animations: [slidingLeftAnimation],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getShoppingList();
    this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  onEdit(i: number) {
    this.shoppingListService.startedEditing.next(i);
  }
}
