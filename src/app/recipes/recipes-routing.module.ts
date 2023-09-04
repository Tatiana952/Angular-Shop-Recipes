import { NgModule } from '@angular/core';
import { BaseRouteReuseStrategy, RouteReuseStrategy, RouterModule, Routes, provideRouter } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
// import { RecipesResolverService } from './recipe-resolver.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes.component';
import { resolveRecipes } from './recipe-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    resolve: [resolveRecipes],
    children: [
      {
        path: '',
        component: RecipeStartComponent,
      },
      {
        path: 'new',
        component: RecipeEditComponent,
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
      },
    ],
  },
];



@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), ],
  exports: [RouterModule],
  providers: [],
})
export class RecipesRoutingModule {}


