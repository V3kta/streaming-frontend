import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SerienService } from './service/serien.service';
import { CreateSerieDialogComponent } from './dialog/create-serie-dialog.component';
import { User } from './model/User';
import { Serie } from 'src/app/model/Serie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loggedUser: User;
  constructor(public dialog: MatDialog, private serienService: SerienService) {}
  serienArray: Serie[];
  displayedColumns: string[] = [
    'name',
    'zgFolge',
    'zgStaffel',
    'zgDatum',
    'beschreibung',
  ];

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateSerieDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
    this.loggedUser = { id: 1, username: 'Luca', password: '1234' };
    this.refreshList(this.loggedUser.id);
  }

  refreshList(userId: number): void {
    this.serienService.refreshSerien(userId).subscribe((result) => {
      this.serienArray = result;
    });
  }

  saveList(): void {
    this.serienService.saveSerien(this.serienArray);
  }

  deleteListElement(serie: Serie): void {
    this.serienService.deleteSerie(serie);
  }
}
