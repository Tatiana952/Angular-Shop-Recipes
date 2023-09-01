// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   Resolve,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { Recipe } from './recipe.model';
// import { DataStorageService } from '../services/data-storage.service';
// import { RecipeService } from '../services/recipe.service';

// @Injectable({ providedIn: 'root' })
// export class RecipesResolverService implements Resolve<Recipe[]> {
//   constructor(
//     private dataStorage: DataStorageService,
//     private recipServ: RecipeService
//   ) {}

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const recip = this.recipServ.getRecipes();
//     if (recip.length === 0) {
//       return this.dataStorage.fetchRecipes();
//     } else {
//       return recip;
//     }
//   }
// }

import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../services/data-storage.service';
import { inject } from '@angular/core';

import { RecipeService } from '../services/recipe.service';

export const resolveRecipes: ResolveFn<Recipe[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  let recip = inject(RecipeService).getRecipes();
  if (recip.length === 0) {
    return inject(DataStorageService).fetchRecipes();
  }
  return recip;
};
