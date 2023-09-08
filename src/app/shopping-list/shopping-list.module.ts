import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingListRoutingModule } from './shopping-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListItemElementComponent } from './list-item-element/list-item-elment.component';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent, ListItemElementComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ShoppingListRoutingModule,
    RouterModule,
    SharedModule,
  ],
})
export class ShoppingListModule {}
