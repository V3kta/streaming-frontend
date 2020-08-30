import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  openAlert(message: string): void {
    this.snackBar.open(message, 'Schließen', { duration: 4000 });
  }
}
