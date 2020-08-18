import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Serie } from 'src/app/model/Serie';
import { User } from 'src/app/model/User';
import { SerienService } from 'src/app/service/serien.service';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-serien-card',
  templateUrl: './serien-card.component.html',
  styleUrls: ['./serien-card.component.scss'],
})
export class SerienCardComponent implements OnInit {
  constructor(private serienService: SerienService, public dialog: MatDialog) {}

  @Input() serieData: Serie;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  faTrash = faTrash;
  faPen = faPen;
  sameViewerList: User[];

  ngOnInit(): void {}

  // aktualisiert Liste der User die Serie auch gesehen haben

  refreshSameViewer(): void {
    this.serienService
      .refreshSameViewer(this.serieData.id)
      .subscribe((result) => {
        this.sameViewerList = result;
      });
  }

  // löscht Serie aus der Datenbank

  deleteSerie(): void {
    this.refreshList.emit(this.serieData.id);
  }

  // bearbeiten der Serie

  editSerie(): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '250px',
      data: {zgDatum: this.serieData.zgDatum, zgFolge: this.serieData.zgFolge, zgStaffel: this.serieData.zgStaffel}
  });
    dialogRef.afterClosed().subscribe(data => {
      if (data != null) {
        this.serieData.zgDatum = data.zgDatum;
        this.serieData.zgFolge = data.zgFolge;
        this.serieData.zgStaffel = data.zgStaffel;
        console.log('The dialog was saved!');
      }

  });
 }
}
