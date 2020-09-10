import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_FORMATS,
} from '@angular/material-moment-adapter';

const CUSTOM_DATE_FORMAT = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    MatButtonToggleModule,
  ],
  exports: [
    MatTableModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    MatButtonToggleModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMAT },
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' }
  ],
})
export class MaterialModule {}
