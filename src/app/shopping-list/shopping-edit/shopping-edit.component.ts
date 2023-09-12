import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  UntypedFormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/core/shopping-list.service';
import { slidingLeftAnimation } from 'src/app/shared/animations';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
  animations: [slidingLeftAnimation],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  public measureSizes: string[] = [
    'гр.',
    'ст.',
    'шт.',
    'мл.',
    'ч.л.',
    'ст.л.',
    'по вкусу',
  ];
  public editMode = false;
  public onClearClick = new Subject<number>();

  private editedItem: Ingredient;
  private editedItemIndex: number;
  private subscriptionShoppingListChanged: Subscription;
  private subscriptionFormReset: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private fb: UntypedFormBuilder
  ) {}

  public ingredientForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.maxLength(20),
        this.ingredientIsForbidden.bind(this),
      ],
    ],
    amount: ['', [Validators.required]],
    measure: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.subscriptionShoppingListChanged =
      this.shoppingListService.startedEditing.subscribe((index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(
          this.editedItemIndex
        );
        if (this.editedItem) {
          this.ingredientForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
            measure: this.editedItem.measure,
          });
        }
      });
    this.subscriptionFormReset = this.shoppingListService.onFormReset.subscribe(
      () => {
        this.onClear();
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptionShoppingListChanged.unsubscribe();
    this.subscriptionFormReset.unsubscribe();
  }

  /**
   * Отправляет значения формы в список покупок
   * @returns Завершение метода, если форма некорректна
   */
  public onSubmit(): void {
    this.ingredientForm.disable();
    this.ingredientForm.updateValueAndValidity();
    if (this.ingredientForm.status === 'INVALID') {
      this.ingredientForm.enable();
      return;
    }
    const value = this.ingredientForm.value;
    const newIngredient = new Ingredient(
      value.name,
      value.amount,
      value.measure
    );
    if (this.editMode) {
      this.shoppingListService.editIngredient(
        this.editedItemIndex,
        newIngredient
      );
    } else {
      this.shoppingListService.addToShoppingList(newIngredient);
    }
    this.ingredientForm.enable();
    this.ingredientForm.reset();
    this.editMode = false;
  }

  /**
   * Очищает форму ингредиента
   */
  public onClear(): void {
    this.ingredientForm.reset();
    this.editMode = false;
    if (this.editedItemIndex || this.editedItemIndex === 0) {
      this.shoppingListService.onClearClick.next(this.editedItemIndex);
    }
  }

  /**
   * Проверяет существования ингредиента в списке покупок по его названию
   * @param control FormControl с названием ингредиента
   * @returns Либо null, если такого ингредиента нет в списке, либо объект типа ValidationErrors с ошибкой 'ingredientIsForbidden'
   */
  private ingredientIsForbidden(control: FormControl): ValidationErrors {
    if (control.value && !this.editMode) {
      const allIngredients = this.shoppingListService.getShoppingList();
      const title: string = control.value.trim().toLowerCase();
      let errorExist: boolean = false;
      allIngredients.forEach((ingredient) => {
        if (ingredient.name.trim().toLowerCase() === title) {
          errorExist = true;
        }
      });
      if (errorExist) {
        return {
          ingredientIsForbidden: {
            actualIngredient: control.value,
          },
        };
      }
    }
    return null;
  }
}
