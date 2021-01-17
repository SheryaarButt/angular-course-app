import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../common/constants';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ShoppingService {

  private readonly INGREDIENTS_PATH_PARTIAL = 'ingredients.json';
  private readonly INGREDIENTS_PATH_FULL = Constants.URL + this.INGREDIENTS_PATH_PARTIAL;

  private ingredients = [];
  public updatedIngredients = new Subject<Ingredient[]>();
  public selectedIngredient = new Subject<Ingredient>();

  constructor(private http: HttpClient) {
    // this.ingredients = [
    //   new Ingredient('Ham', 4),
    //   new Ingredient('Butter', 5),
    //   new Ingredient('Gravy', 7),
    //   new Ingredient('Potatoes', 3)
    // ];
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.notifyIngredientsUpdated();
  }

  deleteIngredient(ingredient: Ingredient): void {
    if (ingredient) {
      this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
      this.notifyIngredientsUpdated();
    }
  }

  selectIngredient(ingredient: Ingredient): void {
    this.selectedIngredient.next(ingredient);
  }

  updateIngredient(selectedIngredient: Ingredient, ingredient: Ingredient): void {
    const ingredientIndex = this.ingredients.indexOf(selectedIngredient);
    this.ingredients[ingredientIndex] = ingredient;
    this.notifyIngredientsUpdated();
  }

  persistIngredients(): void {
    this.http.put(this.INGREDIENTS_PATH_FULL, this.ingredients)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchIngredients(): void {
    this.http.get<Ingredient[]>(this.INGREDIENTS_PATH_FULL)
      .subscribe(response => {
        if (response) {
          this.ingredients = response;
          this.notifyIngredientsUpdated();
        }
      });
  }

  notifyIngredientsUpdated(): void {
    this.updatedIngredients.next(this.getIngredients());
  }
}
