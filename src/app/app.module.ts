import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { SerienCardComponent } from './card/serien-card.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { JwtModule } from '@auth0/angular-jwt';
import { RegisterComponent } from './register/register.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    SerienCardComponent,
    LoginComponent,
    HomeComponent,
    EditDialogComponent,
    RegisterComponent,
    AccountSettingsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          if (localStorage.getItem('currentUser')) {
            return JSON.parse(localStorage.getItem('currentUser')).token;
          }
          return null;
        },
        authScheme: '',
        allowedDomains: ['localhost:8080'],
      },
    }),
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
