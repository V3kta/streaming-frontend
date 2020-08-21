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

  constructor(
    private serienService: SerienService,
    private authService: AuthenticationService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getAllSerien();
    this.refreshUserSerienList();

    this.filteredOptions = this.serienControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.options.slice()))
    );
  }

  // Lädt alle Serien aus der DB

  getAllSerien(): void {
    this.serienService.refreshAllSerien().subscribe((result) => {
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

  refreshUserSerienList(): void {
    this.serienService
      .refreshUserSerien(this.authService.currentUserValue.id)
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

  addSerieToUserList(serie: Serie): void {
    this.serienService
      .saveUserSerie(this.authService.currentUserValue, {
        id: serie.id,
        name: serie.name,
        beschreibung: serie.beschreibung,
        bildPfad: serie.bildPfad,
        zgDatum: null,
        zgFolge: 0,
        zgStaffel: 0,
      })
      .subscribe(() => {
        this.refreshUserSerienList();
        return;
      });

    this.serienControl.setValue('');
  }

  deleteUserSerie(event: number): void {
    this.serienService
      .deleteUserSerie(this.authService.currentUserValue.id, event)
      .subscribe((result) => {
        this.refreshUserSerienList();
      });
  }

  // Filtermethode für das Suchfeld

  private _filter(name: string): Serie[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(
      (option) => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
