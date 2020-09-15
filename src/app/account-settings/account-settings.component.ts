import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/service/settings.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { User } from 'src/app/model/User';
import { AlertService } from 'src/app/service/alert.service';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

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
    this.newEmailControl = new FormControl('' , [Validators.required]);
    this.newEmailRepeatControl = new FormControl('');
    this.newUsernameControl = new FormControl('', [Validators.required]);
  }

  getCurrentUser(): User {
    return this.authService.currentUserValue;
  }

  saveUsername(save: boolean): void {
    if (!this.newUsernameControl.invalid) {
    if (save) {
      this.authService
        .changeUsername(this.newUsernameControl.value)
        .subscribe((result) => {
          if (result === 'NOT_ACCEPTABLE') {
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
    if (!this.newEmailControl.invalid){
    if (save) {
      if (this.newEmailControl.value === this.newEmailRepeatControl.value) {
        this.authService
          .changeEmail(this.newEmailControl.value)
          .subscribe((result) => {
            if (result === 'NOT_ACCEPTABLE') {
              this.alertService.openAlert('Email bereits vorhanden!');
              return;
            }

            this.alertService.openAlert('Email geändert!');
            this.emailEditierbar = false;
            return;
          });

        return;
      }
      this.alertService.openAlert('Emailfelder stimmen nicht überein!');
      return;
    }
    this.emailEditierbar = false;
  }
  }

  savePassword(save: boolean): void {
    if (
      this.oldPasswordControl.value !== this.newPasswordControl.value
      ) {
    if (save) {
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
    this.alertService.openAlert('Das Passwort darf nicht mit dem alten übereinstimen!');
    return;
  }
    this.passwortEditierbar = false;
}

  navigateByUrl(url: string): void {
    this.router.navigateByUrl(url);
  }
}
