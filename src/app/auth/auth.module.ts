import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {AuthRoutesModule} from './auth-routes.module';

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    FormsModule,
    SharedModule,
    AuthRoutesModule
  ]
})
export class AuthModule {}
