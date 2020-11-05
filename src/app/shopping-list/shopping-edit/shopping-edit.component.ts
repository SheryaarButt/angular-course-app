import {Component, Input, OnInit} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingService} from '../shopping.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @Input() selectedIngredient: Ingredient;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
  }

  addIngredient(form: NgForm): void {
    this.shoppingService.addIngredient(
      new Ingredient(form.value.name, form.value.amount)
    );
    this.clearForm(form);
  }
  clearForm(form: NgForm): void {
    form.reset();
  }
  deleteSelectedIngredient(): void {
    this.shoppingService.deleteIngredient(this.selectedIngredient);
    this.selectedIngredient = null;
  }

}
