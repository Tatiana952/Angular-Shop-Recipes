import { NgModule } from '@angular/core';
import { ShoppingListService } from './core/shopping-list.service';
import { RecipeService } from './core/recipe.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';

@NgModule({
  providers: [
    ShoppingListService,
    RecipeService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class CoreModule {}
