import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  public static DISPLAY_CAT_RECIPE = 'recipe';
  public static DISPLAY_CAT_SHOPPING = 'shopping';

  @Output() displayCategoryToggled = new EventEmitter<string>();

  ngOnInit(): void {
  }

  displayRecipe(): void {
    this.displayCategoryToggled.emit(HeaderComponent.DISPLAY_CAT_RECIPE);
  }

  displayShopping(): void {
    this.displayCategoryToggled.emit(HeaderComponent.DISPLAY_CAT_SHOPPING);
  }

}
