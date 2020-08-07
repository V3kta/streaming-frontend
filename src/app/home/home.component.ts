import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { User } from 'src/app/model/User';
import { Serie } from 'src/app/model/Serie';
import { SerienService } from 'src/app/service/serien.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  serienControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  loggedUser: User;
  userSerien: Serie[];
  serien: Serie[];
  sameViewerArray: User[];

  constructor(
    private serienService: SerienService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loggedUser = this.authService.currentUserValue;
    this.getAllSerien();
    this.refreshUserSerienList();

    this.filteredOptions = this.serienControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  // Lädt alle Serien aus der DB

  getAllSerien(): void {
    this.serienService.refreshAllSerien().subscribe((result) => {
      this.serien = result;
      result.forEach((serie) => {
        this.options.push(serie.name);
      });
    });
  }

  // aktualisiert User Serien Liste

  refreshUserSerienList(): void {
    this.serienService
      .refreshUserSerien(this.loggedUser.id)
      .subscribe((result) => {
        this.userSerien = result;
      });
  }

  // aktualisiert Liste der User die Serie auch gesehen haben

  refreshSameViewer(serieId: number): void {
    this.serienService.refreshSameViewer(serieId).subscribe((result) => {
      this.sameViewerArray = result;
    });
  }

  // fügt Serie der User Serien DB hinzu

  addSerieToUserList(name: string): void {
    this.serien.forEach((serie) => {
      if (serie.name === name) {
        this.serienService
          .saveUserSerie(this.loggedUser.id, serie.id)
          .subscribe((result) => {
            console.log(result);
            this.refreshUserSerienList();
            return;
          });
      }
    });
    this.serienControl.setValue('');
  }

  deleteUserSerie(event: number): void {
    this.serienService
      .deleteUserSerie(this.loggedUser.id, event)
      .subscribe((result) => {
        console.log(result);
        this.refreshUserSerienList();
      });
  }

  // Filtermethode für das Suchfeld

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}