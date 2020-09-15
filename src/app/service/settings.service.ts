import { Injectable, OnInit } from '@angular/core';
import { Settings } from '../model/Settings';
import { AlertService } from './alert.service';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private settingsSubject: BehaviorSubject<Settings>;
  private sortingSubject: BehaviorSubject<string>;

  constructor(
    private alertService: AlertService,
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
    this.settingsSubject = new BehaviorSubject<Settings>(null);
    this.sortingSubject = new BehaviorSubject<string>(null);

    if (localStorage.getItem('sorting')) {
      this.sortingSubject.next(localStorage.getItem('sorting'));
    } else {
      localStorage.setItem('sorting', 'nameasc');
      this.sortingSubject.next('nameasc');
    }
  }

  public get currentSettings(): Settings {
    return this.settingsSubject.value;
  }

  public get currentSorting(): string {
    return this.sortingSubject.value;
  }

  public clearSettings(): void {
    this.settingsSubject.next(null);
  }

  public getSettings(): Observable<Settings> {
    return this.http
      .get<Settings>(
        `http://localhost:8080/user/settings/refresh/${this.authService.currentUserValue.id}`
      )
      .pipe(
        map((settings) => {
          if (settings) {
            localStorage.setItem('settings', JSON.stringify(settings));
            this.settingsSubject.next(settings);
            return settings;
          }
          localStorage.setItem(
            'settings',
            JSON.stringify(new Settings('LIST', 'default'))
          );
          this.settingsSubject.next(new Settings('LIST', 'default'));
          this.saveSettings().subscribe();
          return this.settingsSubject.value;
        })
      );
  }

  public saveSettings(): Observable<string> {
    return this.http.post<string>(
      `http://localhost:8080/user/settings/save/${this.authService.currentUserValue.id}`,
      this.settingsSubject.value
    );
  }

  public getLocalSettings(): Settings {
    return JSON.parse(localStorage.getItem('settings'));
  }

  public saveLocalSettings(settings: Settings): void {
    localStorage.setItem('settings', JSON.stringify(settings));
    this.settingsSubject.next(settings);
    this.saveSettings().subscribe();
  }

  public saveSorting(currentSorting: string): void {
    localStorage.setItem('sorting', currentSorting);
    this.sortingSubject.next(currentSorting);
  }
}
