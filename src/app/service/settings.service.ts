import { Injectable, OnInit } from '@angular/core';
import { Settings } from '../model/Settings';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  cardViewMode: string;
  theme: string;

  constructor(private alertService: AlertService) {
    if (!localStorage.getItem('settings')) {
      this.cardViewMode = 'list';
      this.theme = 'default';
      this.saveSettings(this.cardViewMode, this.theme);
    }
    else {
      this.cardViewMode = this.loadSettings().cardViewMode;
      this.theme = this.loadSettings().theme;
    }
  }

  saveSettings(cardViewMode: string, theme: string): void {
    localStorage.setItem(
      'settings',
      JSON.stringify(new Settings(cardViewMode, theme))
    );
  }

  loadSettings(): Settings {
    if (localStorage.getItem('settings')) {
      return JSON.parse(localStorage.getItem('settings'));
    }
    this.alertService.openAlert(
      'Es konnten keine gespeicherten Einstellungen gefunden werden.'
    );

    return null;
  }
}
