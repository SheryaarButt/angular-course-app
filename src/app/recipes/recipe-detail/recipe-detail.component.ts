import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
      const id = params.id;
      this.selectedRecipe = this.recipeService.getRecipe(id);
    });
  }

  ingredientsToShoppingList(): void {
    this.recipeService.ingredientsToShoppingList(this.selectedRecipe.ingredients);
  }
  toEditRecipe(): void {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  deleteRecipe(): void {
    this.recipeService.deleteRecipe(this.selectedRecipe);
    this.router.navigate(['recipes']);
  }

}
