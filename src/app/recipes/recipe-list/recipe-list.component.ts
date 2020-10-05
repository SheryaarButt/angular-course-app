import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Test Recipe', 'This is a great recipe!', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg'),
    new Recipe('Test Recipe 2', 'This is an even better recipe!!', 'https://storage.needpix.com/rsynced_images/healthy-food-3785722_1280.jpg')
  ];

  @Output() recipeSelected = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
  }

  emitRecipeSelected(selectedRecipe: Recipe): void {
    this.recipeSelected.emit(selectedRecipe);
  }

}
