import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingListRoutingModule } from './shopping-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ShoppingListRoutingModule,
    SharedModule,
  ],
})
export class ShoppingListModule {}
