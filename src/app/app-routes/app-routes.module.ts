import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from '../recipes/recipes.component';
import {ShoppingListComponent} from '../shopping-list/shopping-list.component';
import {RecipeDetailComponent} from '../recipes/recipe-detail/recipe-detail.component';
import {PleaseSelectRecipeComponent} from '../recipes/please-select-recipe/please-select-recipe.component';
import {RecipeEditComponent} from '../recipes/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
  {path: 'recipes', component: RecipesComponent, children: [
      {path: '', component: PleaseSelectRecipeComponent, pathMatch: 'full'},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent},
      {path: ':id/edit', component: RecipeEditComponent}
    ]},
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'shoppinglist', component: ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
}
)
export class AppRoutesModule {}
