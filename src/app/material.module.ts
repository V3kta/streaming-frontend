import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatTableModule, MatDialogModule],
  exports: [MatTableModule, MatDialogModule],
})
export class MaterialModule {}
