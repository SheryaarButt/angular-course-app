import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import {FormsModule} from '@angular/forms';
import {DropdownToggleDirective} from './directives/dropdown-toggle.directive';
import {ShoppingService} from './shopping-list/shopping.service';
import {AppRoutesModule} from './app-routes/app-routes.module';
import { PleaseSelectRecipeComponent } from './recipes/please-select-recipe/please-select-recipe.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipesComponent,
    RecipeListComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownToggleDirective,
    PleaseSelectRecipeComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutesModule
  ],
  providers: [ShoppingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
