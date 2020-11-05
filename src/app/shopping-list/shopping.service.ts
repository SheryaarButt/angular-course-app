import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

export class ShoppingService {
  private readonly ingredients: Ingredient[];
  public updatedIngredients = new Subject<Ingredient[]>();
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
    this.updatedIngredients.next(this.getIngredients());
  }
  deleteIngredient(ingredient: Ingredient): void {
    if (ingredient) {
      this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
      this.updatedIngredients.next(this.getIngredients());
    }
  }
}
