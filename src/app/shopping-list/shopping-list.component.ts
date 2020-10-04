import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [];

  constructor() {
    this.ingredients.push(
      new Ingredient('Ham', 4),
      new Ingredient('Butter', 5),
      new Ingredient('Gravy', 7),
      new Ingredient('Potatoes', 3)
    );
  }

  ngOnInit(): void {
  }

}
