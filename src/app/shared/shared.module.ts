import {NgModule} from '@angular/core';
import {DropdownToggleDirective} from '../directives/dropdown-toggle.directive';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {AlertErrorComponent} from '../alerts/alert-error.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    DropdownToggleDirective,
    LoadingSpinnerComponent,
    AlertErrorComponent
  ],
  imports: [CommonModule],
  exports: [
    DropdownToggleDirective,
    LoadingSpinnerComponent,
    AlertErrorComponent,
    CommonModule
  ]
})
export class SharedModule {}
