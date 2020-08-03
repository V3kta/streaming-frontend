import { Component, OnInit } from '@angular/core';
import { SerienService } from './service/serien.service';
import { User } from './model/User';
import { Serie } from 'src/app/model/Serie';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  serienControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  loggedUser: User = { id: 1, username: 'Luca', password: '1234' };
  UserSerien: Serie[];
  Serien: Serie[];
  sameViewerArray: User[];
  displayedColumns: string[] = [
    'name',
    'zgFolge',
    'zgStaffel',
    'zgDatum',
    'beschreibung',
  ];

  constructor(private serienService: SerienService) {}

  ngOnInit(): void {
    this.getAllSerien();
    this.refreshUserSerienList();

    this.filteredOptions = this.serienControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  // Lädt alle Serien aus der DB

  getAllSerien(): void {
    this.serienService.loadSerien().subscribe((result) => {
      this.Serien = result;
      result.forEach((serie) => {
        this.options.push(serie.name);
      });
    });
  }

  // fügt Serie der User Serien DB hinzu

  addSerieToUserList(name: string): void {
    this.Serien.forEach((serie) => {
      if (serie.name === name) {
        this.serienService.saveSerie(serie);
        this.serienService.refreshUserSerien(this.loggedUser);
      }
    });
  }

  // aktualisiert User Serien Liste

  refreshUserSerienList(): void {
    this.serienService
      .refreshUserSerien(this.loggedUser)
      .subscribe((result) => {
        this.UserSerien = result;
        console.log(JSON.stringify(result));
      });
  }

  // aktualisiert Liste der User die Serie auch gesehen haben

  refreshSameViewer(serie: Serie): void {
    this.serienService.refreshSameViewer(serie).subscribe((result) => {
      this.sameViewerArray = result;
    });
  }

  // speichert Serie in die Datenbank ab

  saveSerieToDb(serie: Serie): void {
    this.serienService.saveSerie(serie);
  }

  // löscht Serie aus der Datenbank

  deleteSerieFromUserList(serie: Serie): void {
    this.serienService.deleteSerie(serie);
  }

  // Filtermethode für das Suchfeld

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
