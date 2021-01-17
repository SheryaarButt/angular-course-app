import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RecipeItemComponent} from './recipe-list/recipe-item/recipe-item.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipesComponent} from './recipes.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {PleaseSelectRecipeComponent} from './please-select-recipe/please-select-recipe.component';
import {RecipesRoutesModule} from './recipes-routes.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    RecipesRoutesModule
  ],
  declarations: [
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeEditComponent,
    PleaseSelectRecipeComponent,
  ]
})
export class RecipesModule {}
