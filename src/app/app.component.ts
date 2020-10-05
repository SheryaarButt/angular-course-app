import { Component } from '@angular/core';
import {HeaderComponent} from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'angular-course-app';
  displayCategory: string;

  constructor(){
    this.displayCategory = HeaderComponent.DISPLAY_CAT_SHOPPING;
  }

  setDisplayCategory(displayCategory: string): void {
    this.displayCategory = displayCategory;
  }

  isDisplayRecipe(): boolean{
    return this.displayCategory === HeaderComponent.DISPLAY_CAT_RECIPE;
  }
  isDisplayShopping(): boolean{
    return this.displayCategory === HeaderComponent.DISPLAY_CAT_SHOPPING;
  }
}
