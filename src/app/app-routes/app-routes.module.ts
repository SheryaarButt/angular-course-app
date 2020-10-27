import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from '../recipes/recipes.component';
import {ShoppingListComponent} from '../shopping-list/shopping-list.component';
import {Recipe} from '../recipes/recipe.model';
import {RecipeDetailComponent} from '../recipes/recipe-detail/recipe-detail.component';

const appRoutes: Routes = [
  {path: 'recipes', component: RecipesComponent, children: [
      {path: ':id', component: RecipeDetailComponent}
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
