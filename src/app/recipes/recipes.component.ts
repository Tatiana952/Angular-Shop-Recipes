import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
})
export class RecipesComponent implements OnInit {
  public innerWidth: number;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }
}
