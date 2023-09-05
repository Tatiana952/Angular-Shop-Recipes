import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { slidingRightAnimation } from 'src/app/shared/animations';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  animations: [slidingRightAnimation],
})
export class RecipeDetailComponent implements OnInit {
  public recipeDetails: Recipe;
  private id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    const id = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipeDetails = this.recipeService.getRecipe(this.id);
    });
  }

  /**
   * Метод добавляет все ингредиенты открытого рецепта в список покупок
   */
  public addIngredientsToShoppingList() {
    this.recipeService.fillShoppingList(this.recipeDetails.ingredients);
  }

  /**
   * Метод отправляет открытый рецепт на редактирование
   */
  public onEditRecipe() {
    this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  /**
   * Метод удаляет открытый рецепт из базы
   */
  public onDeleteRecipe() {
    this.recipeService.deleteRec(this.id);
    this.dataStorageService.storeRecipes();
    this.router.navigate(['/recipes']);
  }
}
