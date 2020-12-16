import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  public editMode: boolean;
  public id: string;
  public formGroup: FormGroup;
  public recipeIngredients: FormArray;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = !!params.id ? params.id : '';
      this.editMode = !!params.id;
      this.initForm();
    });
  }

  initForm(): void {
    let name = '';
    let imagePath = '';
    let description = '';
    this.recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const selectedRecipe: Recipe = this.recipeService.getRecipe(this.id);
      name = selectedRecipe.name;
      imagePath = selectedRecipe.imagePath;
      description = selectedRecipe.description;
      if (selectedRecipe.ingredients) {
        selectedRecipe.ingredients.forEach((ingredient) => {
          this.recipeIngredients.push(new FormGroup(
              {
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9][0-9]*$/)
                ])
              }
          ));
        });
      }
    }

    this.formGroup = new FormGroup({
      'id': new FormControl(this.id),
      'name': new FormControl(name, Validators.required),
      'description': new FormControl(description, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'ingredients': this.recipeIngredients
    });
  }
  addIngredient(): void {
    this.recipeIngredients.push(new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9][0-9]*$/)
        ])
        })
    );
  }
  deleteIngredient(index: number): void {
    this.recipeIngredients.removeAt(index);
  }
  saveRecipe(): void {
    const savedRecipe: Recipe = this.recipeService.saveRecipe(this.formGroup.value);
    this.router.navigate(['recipes', savedRecipe.id]);
  }
  toRecipeDetail(): void {
    if (this.editMode) {
      this.router.navigate(['recipes', this.id]);
    } else {
      this.router.navigate(['recipes']);
    }
  }
}
