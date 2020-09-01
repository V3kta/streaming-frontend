import { Injectable, OnInit } from '@angular/core';
import { Settings } from '../model/Settings';
import { AlertService } from './alert.service';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private cardViewModeSubject: BehaviorSubject<string>;
  private themeSubject: BehaviorSubject<string>;
  userId: number;

  constructor(private alertService: AlertService, private http: HttpClient) {
    this.cardViewModeSubject = new BehaviorSubject<string>(null);
    this.themeSubject = new BehaviorSubject<string>(null);
  }

  public getCurrentViewMode(): string {
    return this.cardViewModeSubject.value;
  }

  public getCurrentTheme(): string {
    return this.themeSubject.value;
  }

  refreshSettingsDb(userId: number): void {
    this.userId = userId;
    this.http
      .get<Settings>(
        `http://localhost:8080/user/refreshSettings/${this.userId}`
      )
      .subscribe((result) => {
        console.log(result);
        if (!result) {
          localStorage.setItem(
            'settings',
            JSON.stringify(new Settings('LIST', 'default'))
          );
          return;
        }
        this.cardViewModeSubject.next(result.cardViewMode);
        this.themeSubject.next(result.theme);
        localStorage.setItem('settings', JSON.stringify(result));
        return;
      });
  }

  saveSettingsDb(): Observable<string> {
    const settings = {
      cardViewMode: this.cardViewModeSubject.value,
      theme: this.themeSubject.value,
    };
    return this.http.post<string>(
      `http://localhost:8080/user/saveSettings/${this.userId}`,
      settings
    );
  }

  saveSettingsLocal(mode: string, theme: string): void {
    if (mode != null) {
      this.cardViewModeSubject.next(mode);
    }

    if (theme != null) {
      this.themeSubject.next(theme);
    }

    localStorage.setItem(
      'settings',
      JSON.stringify(
        new Settings(this.cardViewModeSubject.value, this.themeSubject.value)
      )
    );
  }
}
