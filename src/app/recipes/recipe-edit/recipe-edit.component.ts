import { Component, HostListener, OnInit } from '@angular/core';
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
import { Recipe } from '../../shared/models/recipe.model';
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
  public innerWidth: number;
  public editMode = false;
  public successMessage = '';

  private id: number;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
  }

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
    this.innerWidth = window.innerWidth;
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  /**
   * Метод инициализации формы для редактирования выбранного рецепта.
   */
  private initForm(): void {
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
   * Метод отправки формы с данными о рецепте, если она корректна.
   * В режиме редактирования обновляется выбранный существующий рецепт, иначе создается новый
   * @returns Завершение метода, если форма некорректна.
   */
  public onSubmit(): void {
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
    this.handleSuccess(`Рецепт "${newRecipe.title}" был успешно сохранен`);
    this.recipeForm.enable();
    this.recipeForm.reset();
    this.recipeForm.setControl('ingredients', this.fb.array([]));
    this.editMode = false;
  }

  /**
   * Метод добавляет в форму пустой шаблон для нового ингредиента
   */
  public onAddIngredient(): void {
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
  public onDeleteRecipe(): void {
    this.recipeService.deleteRecipe(this.id);
    this.dataStorageService.storeRecipes();
    this.handleSuccess('Рецепт был удален')
    this.recipeForm.reset();
    this.recipeForm.setControl('ingredients', this.fb.array([]));
    this.editMode = false;
  }

  /**
   * Метод закрывает форму редактирования/создания рецепта и перенаправляет на уровень выше по маршруту
   */
  public onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  /**
   * Метод удаляет ингредиент из формы рецепта
   * @param i Индекс ингредиента
   */
  public onDeleteIngredient(i: number): void {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }


  /**
   * Метод устанавливает текст сообщения об успешной операции
   * @param message 
   */
  private handleSuccess(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 2000);
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
        let errorExist: boolean;
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
