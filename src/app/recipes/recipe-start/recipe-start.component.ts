import { Component, HostListener, OnInit } from '@angular/core';
import { slidingRightAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  animations: [slidingRightAnimation],
})
export class RecipeStartComponent implements OnInit {
  public innerWidth: number;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }
}
