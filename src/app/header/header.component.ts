import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {ShoppingService} from '../shopping-list/shopping.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {User} from '../auth/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  userSubscription: Subscription;

  constructor(private recipeService: RecipeService,
              private shoppingService: ShoppingService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.userSubject
      .subscribe(
        (user: User) => {
          this.isAuthenticated = !!user;
          if (!this.isAuthenticated) {
            localStorage.clear();
            this.router.navigate(['auth']);
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  persistData(): void {
    this.shoppingService.persistIngredients();
    this.recipeService.persistRecipes();
  }

  fetchData(): void {
    this.shoppingService.fetchIngredients();
    this.recipeService.fetchRecipes();
  }

  logout(): void {
    this.authService.userSubject.next(null);
    clearTimeout(this.authService.autoLogoutTimer);
  }

}
