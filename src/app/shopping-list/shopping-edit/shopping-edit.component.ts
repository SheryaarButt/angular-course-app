import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingService} from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
  }

  addIngredient(): void {
    this.shoppingService.addIngredient(
      new Ingredient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value)
    );
  }

}
