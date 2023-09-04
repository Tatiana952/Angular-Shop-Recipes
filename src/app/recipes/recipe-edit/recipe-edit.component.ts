import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  UntypedFormArray,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { slidingRightAnimation } from '../../shared/animations';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
  animations: [slidingRightAnimation],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private resServ: RecipeService,
    private dataStorage: DataStorageService,
    private router: Router,
    private fb: UntypedFormBuilder
  ) {}

  recipeForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    imagePath: ['', [Validators.required]],
    desc: ['', [Validators.required]],
    ingredients: this.fb.array([]),
  });

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  // show() {
  //   console.log(this.recipeForm);
  // }

  private initForm() {
    if (this.editMode) {
      let recIngredients = this.fb.array([]);
      const recipe: Recipe = this.resServ.getRecipe(this.id);

      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recIngredients.push(
            this.fb.group({
              name: [
                ingredient.name,
                [Validators.required, Validators.maxLength(20)],
              ],
              amount: [
                ingredient.amount,
                [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)],
              ],
            })
          );
        }
      }

      this.recipeForm.patchValue({
        name: recipe.name,
        imagePath: recipe.imagePath,
        desc: recipe.description,
      });
      this.recipeForm.setControl('ingredients', recIngredients);
    }
  }

  onSubmit() {
    this.recipeForm.disable();
    this.recipeForm.updateValueAndValidity();
    const newRec = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['desc'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );
    if (this.editMode) {
      this.resServ.updateRecipe(this.id, newRec);
    } else {
      this.resServ.addRecipe(newRec);
    }

    this.dataStorage.storeRecipes();
    this.recipeForm.enable();
    this.recipeForm.reset();
    this.recipeForm.setControl('ingredients', this.fb.array([]));
    this.editMode = false;
  }

  onAddIngred() {
    (<UntypedFormArray>this.recipeForm.get('ingredients')).push(
      this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(20)]],
        amount: [
          '',
          [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)],
        ],
      })
    );
  }

  onDelete() {
    this.resServ.deleteRec(this.id);
    this.dataStorage.storeRecipes();
    this.recipeForm.reset();
    this.editMode = false;
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDelIngred(i: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }
}
