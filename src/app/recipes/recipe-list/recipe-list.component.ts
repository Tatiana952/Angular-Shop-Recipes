import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  public innerWidth: number;
  public search: string = null;
  public recipes: Recipe[] = [];
  private recipesSubscription: Subscription = null;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
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
   * Метод перенаправляет на страницу добавления нового рецепта
   */
  public onNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
