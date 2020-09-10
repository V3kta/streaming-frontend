import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { User } from 'src/app/model/User';
import { Serie } from 'src/app/model/Serie';
import { SerienService } from 'src/app/service/serien.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AlertService } from 'src/app/service/alert.service';
import { SettingsService } from 'src/app/service/settings.service';
import { CardViewMode } from 'src/app/model/Enums';
import { Settings } from 'src/app/model/Settings';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  faSearch = faSearch;
  serienControl = new FormControl();
  options: Serie[] = [];
  filteredOptions: Observable<Serie[]>;

  userSerien: Serie[];
  sameViewerArray: User[];
  cardViewMode = CardViewMode;

  constructor(
    private serienService: SerienService,
    private authService: AuthenticationService,
    private alertService: AlertService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.getSerien();
    this.getUserSerien();
    this.settingsService.getSettings().subscribe();

    this.filteredOptions = this.serienControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.options.slice()))
    );
  }

  // Lädt alle Serien aus der DB

  getSerien(): void {
    this.serienService.getSerien().subscribe((result) => {
      if (!result) {
        this.alertService.openAlert('Serien konnten nicht geladen werden');
        return;
      }
      result.forEach((serie) => {
        this.options.push(serie);
      });
    });
  }

  // aktualisiert User Serien Liste

  getUserSerien(): void {
    this.serienService
      .getUserSerien(this.authService.currentUserValue.id)
      .subscribe((result) => {
        if (!result) {
          this.alertService.openAlert(
            'Nutzerserien konnten nicht geladen werden'
          );
          return;
        }
        this.userSerien = result;
      });
  }

  // fügt Serie der User Serien DB hinzu

  saveUserSerie(serie: Serie): void {
    if (!this.userSerien.some((e) => e.id === serie.id)) {
      this.serienService
        .saveUserSerie(this.authService.currentUserValue.id, {
          id: serie.id,
          name: serie.name,
          beschreibung: serie.beschreibung,
          bildPfad: serie.bildPfad,
          zgDatum: moment().format('DD.MM.YYYY'),
          zgFolge: 1,
          zgStaffel: 1,
        })
        .subscribe(() => {
          this.getUserSerien();
          return;
        });

      this.serienControl.setValue('');
    }
    this.alertService.openAlert('Serie bereits vorhanden!');
  }

  deleteUserSerie(event: number): void {
    this.serienService
      .deleteUserSerie(this.authService.currentUserValue.id, event)
      .subscribe((result) => {
        this.getUserSerien();
      });
  }

  // Filtermethode für das Suchfeld

  private _filter(name: string): Serie[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(
      (option) => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  getCurrentViewMode(): string {
    const settings = this.settingsService.currentSettings;
    if (settings && settings.cardViewMode) {
      return settings.cardViewMode;
    }
    return 'LIST';
  }

  saveCurrentViewMode(currentViewMode: string): void {
    this.settingsService.saveLocalSettings(
      new Settings(currentViewMode, 'default')
    );
  }
}
