import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { SettingsService } from 'src/app/service/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {}

  getCurrentUser(): User {
    return this.authService.currentUserValue;
  }

  getCurrentUrl(): string {
    return this.router.url;
  }

  navigateByUrl(url: string): void {
    this.router.navigateByUrl(url);
  }

  logout(): void {
    this.authService.logout();
    this.settingsService.clearSettings();
    this.router.navigateByUrl('login');
  }
}
