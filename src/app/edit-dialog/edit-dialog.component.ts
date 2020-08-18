import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  datumControl = new FormControl(this.data.zgDatum);
  folgeControl = new FormControl(this.data.zgFolge);
  staffelControl = new FormControl(this.data.zgStaffel);
  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(JSON.stringify(this.data));
  }
  saveChanges(): void {
    this.data.zgDatum = this.datumControl.value;
    this.data.zgFolge = this.folgeControl.value;
    this.data.zgStaffel = this.staffelControl.value;
    this.dialogRef.close(this.data);
  }

  cancelChanges(): void {
    this.dialogRef.close(null);
  }

}
