import {Component, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingService} from '../shopping.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  editMode = false;
  selectedIngredient: Ingredient;
  @ViewChild('form') form: NgForm;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.shoppingService.selectedIngredient.subscribe((ingredient) => {
      this.form.form.patchValue({
        name: ingredient.name,
        amount: ingredient.amount
      });
      this.selectedIngredient = ingredient;
      this.editMode = true;
    });
  }

  addOrEditIngredient(): void {
    if (this.editMode) {
      this.shoppingService.updateIngredient(this.selectedIngredient, new Ingredient(this.form.value.name, this.form.value.amount));
    } else {
      this.shoppingService.addIngredient(
        new Ingredient(this.form.value.name, this.form.value.amount)
      );
    }
    this.leaveEditMode();
  }
  deleteSelectedIngredient(): void {
    this.shoppingService.deleteIngredient(this.selectedIngredient);
    this.leaveEditMode();
  }
  leaveEditMode(): void {
    this.editMode = false;
    this.selectedIngredient = null;
    this.form.reset();
  }
  addOrEdit(): string {
    return this.editMode ? 'Update' : 'Add';
  }

}
