import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingService} from '../shopping-list/shopping.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
  private recipes: Recipe[];
  public updatedRecipes = new Subject<Recipe[]>();
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
    recipe.id = this.recipes.length === 0 ? '1' : String(+this.recipes[this.recipes.length - 1].id + 1);
    this.recipes.push(recipe);
    this.updatedRecipes.next(this.getRecipes());
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
  updateRecipe(updatedRecipe: Recipe): boolean {
    if (!updatedRecipe.id) {
      return false;
    }
    const currentRecipe = this.recipes.find(recipe => updatedRecipe.id === recipe.id);
    if (currentRecipe) {
      currentRecipe.id = updatedRecipe.id;
      currentRecipe.name = updatedRecipe.name;
      currentRecipe.description = updatedRecipe.description;
      currentRecipe.ingredients = updatedRecipe.ingredients;
      currentRecipe.imagePath = updatedRecipe.imagePath;
      this.updatedRecipes.next(this.getRecipes());
      return true;
    }
    return false;
  }
  saveRecipe(recipe: Recipe): Recipe {
    if (!this.updateRecipe(recipe)) {
      this.addRecipe(recipe);
    }
    return recipe;
  }
  deleteRecipe(recipe: Recipe): void {
    const recipeIndex: number = this.recipes.indexOf(recipe);
    if (recipeIndex >= 0) {
      this.recipes.splice(recipeIndex, 1);
      this.updatedRecipes.next(this.getRecipes());
    }
  }
}
