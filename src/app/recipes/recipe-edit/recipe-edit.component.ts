import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  UntypedFormArray,
  UntypedFormBuilder,
  ValidationErrors,
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
  public measureSizes: string[] = [
    'гр.',
    'ст.',
    'шт.',
    'мл.',
    'ч.л.',
    'ст.л.',
    'по вкусу',
  ];

  private id: number;
  private editMode = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService
  ) {}

  public recipeForm = this.fb.group({
    title: [
      '',
      [
        Validators.required,
        Validators.maxLength(20),
        this.forbiddenRecipeTitle.bind(this),
      ],
    ],
    imagePath: ['', [Validators.required]],
    description: ['', [Validators.required]],
    ingredients: this.fb.array([]),
  });

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  /**
   * Метод инициализации формы рецепта.
   */
  private initForm() {
    if (this.editMode) {
      let recipeIngredients = this.fb.array([]);
      const recipe: Recipe = this.recipeService.getRecipe(this.id);

      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            this.fb.group({
              name: [
                ingredient.name,
                [Validators.required, Validators.maxLength(20)],
              ],
              amount: [ingredient.amount, [Validators.required]],
              measure: [ingredient.measure, [Validators.required]],
            })
          );
        }
      }
      this.recipeForm.patchValue({
        title: recipe.title,
        imagePath: recipe.imagePath,
        description: recipe.description,
      });
      this.recipeForm.setControl('ingredients', recipeIngredients);
    }
  }

  /**
   * Метод отправки формы, если она корректна.
   * @returns Завершение метода, если форма некорректна.
   */
  public onSubmit() {
    console.log(this.recipeForm);
    this.recipeForm.disable();
    this.recipeForm.updateValueAndValidity();
    if (this.recipeForm.status === 'INVALID') {
      this.recipeForm.enable();
      return;
    }
    const newRecipe = new Recipe(
      this.recipeForm.value['title'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }

    this.dataStorageService.storeRecipes();
    this.recipeForm.enable();
    this.recipeForm.reset();
    this.recipeForm.setControl('ingredients', this.fb.array([]));
    this.editMode = false;
  }

  /**
   * Метод добавляет в форму пустой шаблон для нового ингредиента
   */
  public onAddIngredient() {
    (<UntypedFormArray>this.recipeForm.get('ingredients')).push(
      this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(20)]],
        amount: ['', [Validators.required]],
        measure: ['', [Validators.required]],
      })
    );
  }

  /**
   * Метод удаляет рецепт из базы данных
   */
  public onDeleteRecipe() {
    this.recipeService.deleteRec(this.id);
    this.dataStorageService.storeRecipes();
    this.recipeForm.reset();
    this.recipeForm.setControl('ingredients', this.fb.array([]));
    this.editMode = false;
  }

  /**
   * Метод закрывает режим редактирования и перенаправляет на уровень выше по маршруту
   */
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  /**
   * Метод удаляет ингредиент из формы рецепта
   * @param i Индекс рецепта
   */
  onDeleteIngredient(i: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }

  /**
   * Метод валидации названия рецепта. Проверяет существует ли уже рецепт с таким названием
   * @param control FormControl с названием рецепта
   * @returns Либо null, либо объект типа ValidationErrors с ошибкой 'titleIsForbidden'
   */
  private forbiddenRecipeTitle(control: FormControl): ValidationErrors {
    let controlValue = control.value;
    if (controlValue) {
      controlValue = controlValue.toLowerCase();
      if (!this.editMode) {
        const allRecipes = this.recipeService.getRecipes();
        let errorExist: any = null;
        allRecipes.forEach((recipe) => {
          if (recipe.title.toLowerCase().trim().includes(controlValue)) {
            errorExist = true;
          }
        });
        if (errorExist) {
          return {
            titleIsForbidden: true,
          };
        }
      }
    }
    return null;
  }
}
