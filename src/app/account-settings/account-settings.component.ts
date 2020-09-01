import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/service/settings.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {
  usernameEditierbar: boolean;
  emailEditierbar: boolean;
  passwortEditierbar: boolean;
  showPassword: boolean;

  oldPasswordControl: FormControl;
  newPasswordControl: FormControl;
  newPasswordRepeatControl: FormControl;

  constructor(
    private settingsService: SettingsService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.usernameEditierbar = false;
    this.emailEditierbar = false;
    this.passwortEditierbar = false;
    this.showPassword = false;
  }

  getCurrentUser(): User {
    return this.authService.currentUserValue;
  }

  showHidePassword(): void {
    this.showPassword = !this.showPassword;
  }

  editUsername(): void  {
    this.usernameEditierbar = true;
  }

  editEmail(): void  {
    this.emailEditierbar = true;
  }

  editPassword(): void  {
    this.passwortEditierbar = true;
  }

  saveUsername(username: string): void {
    if (!username) {
    }
    this.usernameEditierbar = false;
  }

  saveEmail(email: string): void  {
    if (!email) {
    }
    this.emailEditierbar = false;
  }

  savePassword(save: boolean): void  {
    if (save) {

    }
    this.passwortEditierbar = false;
  }

  navigateByUrl(url: string): void {
    this.router.navigateByUrl(url);
  }
}
