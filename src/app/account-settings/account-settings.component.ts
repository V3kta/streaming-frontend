import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/service/settings.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { User } from 'src/app/model/User';
import { AlertService } from 'src/app/service/alert.service';
import { StatusCodes } from 'http-status-codes';

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

  newEmailControl: FormControl;
  newEmailRepeatControl: FormControl;

  newUsernameControl: FormControl;

  constructor(
    private settingsService: SettingsService,
    private alertService: AlertService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.usernameEditierbar = false;
    this.emailEditierbar = false;
    this.passwortEditierbar = false;
    this.showPassword = false;

    this.oldPasswordControl = new FormControl('');
    this.newPasswordControl = new FormControl('');
    this.newPasswordRepeatControl = new FormControl('');
    this.newEmailControl = new FormControl('', [
      Validators.required,
      Validators.pattern('\\w{1,}(\\.|_){0,1}\\w{1,}@\\w{1,}\\.\\w{1,}'),
    ]);
    this.newEmailRepeatControl = new FormControl('');
    this.newUsernameControl = new FormControl('', [
      Validators.required,
      Validators.pattern('\\w{3,} {0,1}\\w{0,}'),
    ]);
  }

  getCurrentUser(): User {
    return this.authService.currentUserValue;
  }

  saveUsername(save: boolean): void {
    if (save) {
      if (!this.newUsernameControl.invalid) {
        this.authService
          .changeUsername(this.newUsernameControl.value)
          .subscribe((status) => {
            if (status === StatusCodes.NOT_ACCEPTABLE.toString()) {
              this.alertService.openAlert('Username bereits vorhanden!');
              return;
            }
            this.usernameEditierbar = false;
            this.alertService.openAlert('Username geändert!');
            return;
          });
      }
    }

    if (!save) {
      this.usernameEditierbar = false;
    }
  }

  saveEmail(save: boolean): void {
    if (save) {
      if (this.newEmailControl.value === this.newEmailRepeatControl.value) {
        this.authService
          .changeEmail(this.newEmailControl.value)
          .subscribe((status) => {
            if (status === StatusCodes.NOT_ACCEPTABLE.toString()) {
              this.alertService.openAlert(
                'Email darf nicht mit alter Email übereinstimmen!'
              );
              return;
            }
            this.emailEditierbar = false;
            this.alertService.openAlert('Email erfolgreich geändert!');
            return;
          });
      }
      this.alertService.openAlert('Emailfelder stimmen nicht überein!');
      return;
    }

    if (!save) {
      this.emailEditierbar = false;
    }
  }

  savePassword(save: boolean): void {
    if (save) {
      if (this.oldPasswordControl.value !== this.newPasswordControl.value) {
        if (
          this.newPasswordControl.value === this.newPasswordRepeatControl.value
        ) {
          this.authService
            .changePassword(
              this.oldPasswordControl.value,
              this.newPasswordControl.value
            )
            .subscribe((result) => {
              if (result === 'NOT_ACCEPTABLE') {
                this.alertService.openAlert('Altes Passwort ungültig!');
                return;
              }
              this.alertService.openAlert('Passwort geändert!');
              this.passwortEditierbar = false;
              return;
            });
          return;
        }
        this.alertService.openAlert('Passwortfelder stimmen nicht überein!');
        return;
      }
      this.alertService.openAlert(
        'Das Passwort darf nicht mit dem Alten übereinstimmen!'
      );
      return;
    }
    this.passwortEditierbar = false;
  }

  navigateByUrl(url: string): void {
    this.router.navigateByUrl(url);
  }
}
