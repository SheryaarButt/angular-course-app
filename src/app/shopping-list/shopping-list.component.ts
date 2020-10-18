import { Component, OnInit } from '@angular/core';
import {ShoppingService} from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  constructor(public shoppingService: ShoppingService) {}

  ngOnInit(): void {
  }

}
