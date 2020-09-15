import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { CardViewMode } from 'src/app/model/Enums';
import { Serie } from 'src/app/model/Serie';
import { User } from 'src/app/model/User';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { SerienService } from 'src/app/service/serien.service';
import { SettingsService } from 'src/app/service/settings.service';

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
  @Output() deleteUserSerie: EventEmitter<any> = new EventEmitter();
  cardViewMode = CardViewMode;
  sameViewerList: User[];
  serieEditierbar: boolean;
  datumControl: FormControl;
  folgeControl: FormControl;
  staffelControl: FormControl;

  ngOnInit(): void {
    this.getViewers();
    this.serieEditierbar = false;
    this.datumControl = new FormControl('');
    this.folgeControl = new FormControl('');
    this.staffelControl = new FormControl('');
  }

  // aktualisiert Liste der User die Serie auch gesehen haben

  getViewers(): void {
    this.serienService.getViewers(this.serieData.id).subscribe((result) => {
      this.sameViewerList = result.filter((user) => {
        if (user.username !== this.authService.currentUserValue.username) {
          return user;
        }
      });
    });
  }

  // löscht Serie aus der Datenbank

  delete(): void {
    this.deleteUserSerie.emit(this.serieData.id);
  }

  // bearbeiten der Serie

  editSerieZgInfo(): void {
    this.serieEditierbar = true;
    this.datumControl.setValue(moment(this.serieData.zgDatum, 'DD.MM.YYYY'));
    this.folgeControl.setValue(this.serieData.zgFolge);
    this.staffelControl.setValue(this.serieData.zgStaffel);
  }

  saveSerieZgInfo(save: boolean): void {
    if (save) {
      this.serieData.zgDatum = moment(this.datumControl.value).format(
        'DD.MM.YYYY'
      );
      this.serieData.zgFolge = this.folgeControl.value;
      this.serieData.zgStaffel = this.staffelControl.value;

      this.serienService
        .saveUserSerie(this.authService.currentUserValue.id, this.serieData)
        .subscribe(this.refreshList.emit);
    }
    this.serieEditierbar = false;
  }

  getCurrentViewMode(): string {
    const settings = this.settingsService.currentSettings;
    if (settings && settings.cardViewMode) {
      return settings.cardViewMode;
    }
    return 'LIST';
  }
}
