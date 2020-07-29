import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CreateSerieDialogComponent } from './dialog/create-serie-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { SerienCardComponent } from './Card/serien-card.component';

@NgModule({
  declarations: [AppComponent, CreateSerieDialogComponent, SerienCardComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
