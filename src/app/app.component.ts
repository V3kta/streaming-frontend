import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog} from '@angular/material/dialog';
import { SerienService } from './service/serien.service';
import { CreateSerieDialogComponent } from './dialog/create-serie-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: any;
  constructor(public dialog: MatDialog, serienService: SerienService) {}
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'name',
    'zgFolge',
    'zgStaffel',
    'zgDatum',
    'beschreibung',
  ];

  // tslint:disable-next-line: typedef
  openDialog(){
    const dialogRef = this.dialog.open(CreateSerieDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
