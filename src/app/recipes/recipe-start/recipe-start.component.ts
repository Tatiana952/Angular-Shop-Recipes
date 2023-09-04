import { Component } from '@angular/core';
import { slidingRightAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css'],
  animations: [slidingRightAnimation]
})
export class RecipeStartComponent {

}
