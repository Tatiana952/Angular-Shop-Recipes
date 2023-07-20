import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shop';
  loadedVar: any;

  onNavigate(variant: string){
    this.loadedVar = variant;

  }
}
