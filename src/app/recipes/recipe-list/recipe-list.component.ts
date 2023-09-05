import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { slidingLeftAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  animations: [slidingLeftAnimation],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  public recipes: Recipe[] = [];
  public search: string = null;
  private recipesSubscription: Subscription = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.recipesSubscription = this.recipeService.recipesChanged.subscribe(
      (rec: Recipe[]) => {
        this.recipes = rec;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }

  /**
   * Метод перенаправляет к добавлению нового рецепта
   */
  public onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
