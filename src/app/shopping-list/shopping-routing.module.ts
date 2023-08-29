import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';
import { CommonModule } from '@angular/common';

const shopRoutes: Routes = [
  { path: '', component: ShoppingListComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(shopRoutes)],
  exports: [RouterModule],
})
export class ShoppingListRoutingModule {}
