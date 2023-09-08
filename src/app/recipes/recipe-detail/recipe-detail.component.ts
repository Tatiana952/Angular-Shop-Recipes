import { Component, HostListener, OnInit } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';
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
  public innerWidth: number;
  public message: string;
  private id: number;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    const id = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipeDetails = this.recipeService.getRecipe(this.id);
    });
  }

  /**
   * Метод добавляет все ингредиенты рецепта в список покупок
   */
  public addIngredientsToShoppingList(): void {
    this.recipeService.fillShoppingList(this.recipeDetails.ingredients);
    this.message = 'Вы добавили ингредиенты в корзину';
    setTimeout(() => {
      this.message = '';
    }, 3500);
  }

  /**
   * Метод отправляет рецепт на редактирование
   */
  public onEditRecipe(): void {
    this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  /**
   * Метод удаляет рецепт из базы
   */
  public onDeleteRecipe(): void {
    this.recipeService.deleteRecipe(this.id);
    this.dataStorageService.storeRecipes();
    this.router.navigate(['/recipes']);
  }
}
