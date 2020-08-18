import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { SerienCardComponent } from './Card/serien-card.component';
import { SameViewerCardComponent } from './Card/same-viewer-card.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    SerienCardComponent,
    SameViewerCardComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          if (localStorage.length > 0) {
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
