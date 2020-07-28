import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SerienService } from './service/serien.service';
import { User } from './model/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public dialog: MatDialog, private serienService: SerienService) {}
  dataSource = new MatTableDataSource();
  userTest: User;
  displayedColumns: string[] = [
    'name',
    'zgFolge',
    'zgStaffel',
    'zgDatum',
    'beschreibung',
  ];

  refreshList(): void {
    this.userTest.userId = 1;
    this.userTest.passwort = '1234';
    this.userTest.username = 'TEST';

    this.serienService.refresh(this.userTest.userId).subscribe((result) => {
      this.dataSource = new MatTableDataSource(result);
    });
  }
}
