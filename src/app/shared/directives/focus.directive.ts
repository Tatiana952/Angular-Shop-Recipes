import { Directive, Input, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Directive({
  selector: '[appSingleFocus]',
  exportAs: 'singleFocus',
})
export class SingleFocusDirective implements OnInit {
  private subscriptionOnClearClick: Subscription = null;
  private subscriptionOnDeleteIngredient: Subscription = null;
  private selection: Map<number, string> = new Map<number, string>();
  @Input() appSingleFocus;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscriptionOnDeleteIngredient =
      this.shoppingListService.onIngredientDelete.subscribe((id) => {
        if (this.hasItem(id)) {
          this.toggleItem(id);
        }
      });
    this.subscriptionOnClearClick =
      this.shoppingListService.onClearClick.subscribe((id) => {
        this.selection.delete(id);
      });
  }

  ngOnDestroy(): void {
    this.subscriptionOnDeleteIngredient.unsubscribe();
    this.subscriptionOnClearClick.unsubscribe();
  }

  /**
   * Метод проверяет есть ли элемент с определенным индексом в коллекции selection
   * @param id Индекс элемента
   * @returns true, если элемент присутствует, иначе false
   */
  public hasItem(id: number): boolean {
    return this.selection.has(id);
  }

  /**
   * Метод убирает или добавляет элемент в коллекцию selection
   * @param id Индекс элемента
   */
  public toggleItem(id: number): void {
    const hasThisItem = this.hasItem(id);
    this.selection.clear();
    if (hasThisItem) {
      this.shoppingListService.onFormReset.next();
      this.selection.delete(id);
    } else {
      this.shoppingListService.startedEditing.next(+id);
      this.selection.set(id, 'selected');
    }
  }
}
