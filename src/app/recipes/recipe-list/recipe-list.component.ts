import {Component, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  public recipes: Recipe[] = [];
  private recipesUpdatedSubscription: Subscription;
  @Output() emit = new EventEmitter<void>();
  private $value: string;
  set value(value: string) {
    this.$value = value;
  }
  get value(): string {
    return this.$value;
  }

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipesUpdatedSubscription = this.recipeService.updatedRecipes.subscribe(recipes => {
      this.recipes = recipes;
    });
    setInterval(() => this.emit.emit(), 5000);
  }

  ngOnDestroy(): void {
    this.recipesUpdatedSubscription.unsubscribe();
  }

}
