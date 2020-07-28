import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-serie-dialog',
  templateUrl: './create-serie-dialog.component.html',
  styleUrls: ['./create-serie-dialog.component.scss'],
})
export class CreateSerieDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateSerieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
