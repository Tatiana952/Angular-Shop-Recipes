import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private resServ: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recImgUrl = '';
    let recDescrip = '';
    let recIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.resServ.getRecipe(this.id);
      recipeName = recipe.name;
      recImgUrl = recipe.imagePath;
      recDescrip = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[0-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recImgUrl, Validators.required),
      'desc': new FormControl(recDescrip, Validators.required),
      'ingredients': recIngredients,
    });
  }

  onSubmit() {
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
    // if (this.editMode) {
    //   this.resServ.updateRecipe(this.id, this.recipeForm.value);
      
    // } else {
    //   this.resServ.addRecipe(this.recipeForm.value);
    // }
    this.recipeForm.reset();
    this.editMode = false;
  }

  onAddIngred() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount' : new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[0-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDelete(){
    this.resServ.deleteRec(this.id);
    this.recipeForm.reset();
    this.editMode = false;
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route} )

  }

  onDelIngred(i: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);

  }
}
