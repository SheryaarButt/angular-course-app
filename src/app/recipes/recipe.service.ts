import {Recipe} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingService} from '../shopping-list/shopping.service';

@Injectable()
export class RecipeService {
  private recipes: Recipe[];
  public recipeSelected = new EventEmitter<Recipe>();
  constructor(private shoppingService: ShoppingService){
    this.recipes = [
      new Recipe('1', 'Test Recipe',
        'This is a great recipe!',
        'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
        [new Ingredient('Shrimp', 2), new Ingredient('Pasta', 4)]),
      new Recipe('2', 'Test Recipe 2',
        'This is an even better recipe!!',
        'https://storage.needpix.com/rsynced_images/healthy-food-3785722_1280.jpg',
        [new Ingredient('Shrimp', 4), new Ingredient('Avocado', 6)])
    ];
  }
  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
  }
  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
  getRecipe(id: string): Recipe {
    return this.recipes.find((recipe) => recipe.id === id);
  }
  ingredientsToShoppingList(ingredients: Ingredient[]): void{
    for (const ingredient of ingredients) {
      this.shoppingService.addIngredient(ingredient);
    }
  }
}
