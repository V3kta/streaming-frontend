import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Serie } from 'src/app/model/Serie';
import { User } from 'src/app/model/User';
import { SerienService } from 'src/app/service/serien.service';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { SettingsService } from 'src/app/service/settings.service';
import { CardViewMode } from 'src/app/model/Enums';

@Component({
  selector: 'app-serien-card',
  templateUrl: './serien-card.component.html',
  styleUrls: ['./serien-card.component.scss'],
})
export class SerienCardComponent implements OnInit {
  constructor(
    private serienService: SerienService,
    private authService: AuthenticationService,
    private settingsService: SettingsService,
    public dialog: MatDialog
  ) {}

  @Input() serieData: Serie;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  cardViewMode = CardViewMode;
  sameViewerList: User[];

  ngOnInit(): void {
    this.refreshSameViewer();
  }

  // aktualisiert Liste der User die Serie auch gesehen haben

  refreshSameViewer(): void {
    this.serienService
      .refreshSameViewer(this.serieData.id)
      .subscribe((result) => {
        this.sameViewerList = result.filter((user) => {
          if (user.username !== this.authService.currentUserValue.username) {
            return user;
          }
        });
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
      data: {
        zgDatum: this.serieData.zgDatum,
        zgFolge: this.serieData.zgFolge,
        zgStaffel: this.serieData.zgStaffel,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data != null) {
        this.serieData.zgDatum = data.zgDatum;
        this.serieData.zgFolge = data.zgFolge;
        this.serieData.zgStaffel = data.zgStaffel;

        this.serienService
          .saveUserSerie(this.authService.currentUserValue, {
            id: this.serieData.id,
            name: this.serieData.name,
            beschreibung: this.serieData.beschreibung,
            bildPfad: this.serieData.bildPfad,
            zgDatum: this.serieData.zgDatum,
            zgFolge: this.serieData.zgFolge,
            zgStaffel: this.serieData.zgStaffel,
          })
          .subscribe((result) => {
            console.log(result);
          });
      }
    });
  }

  getCurrentViewMode(): string {
    return this.settingsService.getCurrentViewMode();
  }
}
