import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingService} from './shopping.service';
import {Ingredient} from '../shared/ingredient.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  public ingredients: Ingredient[] = [];
  private ingredientsUpdatedSubscription: Subscription;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.ingredientsUpdatedSubscription =
      this.shoppingService.updatedIngredients.subscribe(
        (ingredients) => {
          this.ingredients = ingredients;
      });
  }

  ngOnDestroy(): void {
    this.ingredientsUpdatedSubscription.unsubscribe();
  }

}
