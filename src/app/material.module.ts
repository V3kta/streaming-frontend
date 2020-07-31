import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatTableModule, MatDialogModule, MatButtonModule],
  exports: [MatTableModule, MatDialogModule, MatButtonModule],
})
export class MaterialModule {}
