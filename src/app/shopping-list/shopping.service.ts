import {Ingredient} from '../shared/ingredient.model';

export class ShoppingService {
  private readonly ingredients: Ingredient[];
  constructor(){
    this.ingredients = [
      new Ingredient('Ham', 4),
      new Ingredient('Butter', 5),
      new Ingredient('Gravy', 7),
      new Ingredient('Potatoes', 3)
    ];
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
  }
}
