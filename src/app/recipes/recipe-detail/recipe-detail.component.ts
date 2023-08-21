import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipeDet: Recipe;
  id: number;

  constructor(
    private recServ: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  addShopping() {
    this.recServ.fillShoppingList(this.recipeDet.ingredients);
  }

  ngOnInit(): void {
    const id = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipeDet = this.recServ.getRecipe(this.id);
    });
  }

  onEditRecipe() {
    // this.router.navigate(['edit'], { relativeTo: this.route });
    this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDeleteRec(){
    this.recServ.deleteRec(this.id);
    this.router.navigate(['/recipes'])
  }
}
