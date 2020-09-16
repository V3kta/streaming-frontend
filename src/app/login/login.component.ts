import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { SettingsService } from 'src/app/service/settings.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginControl: FormControl;
  passwordControl: FormControl;
  returnUrl: string;

  constructor(
    private authService: AuthenticationService,
    private alertService: AlertService,
    private settingsService: SettingsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['home']);
    }
  }

  ngOnInit(): void {
    this.loginControl = new FormControl('');
    this.passwordControl = new FormControl('');
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(): void {
    this.authService
      .login(this.loginControl.value, this.passwordControl.value)
      .subscribe((user) => {
        if (user === this.authService.currentUserValue) {
          this.router.navigate(['home']);
          return;
        }
        this.alertService.openAlert('Benutzername/Email oder Passwort falsch!');
      });
    localStorage.setItem('sorting', 'default');
  }

  registerActivation(): void {
    this.router.navigate(['register']);
  }
}
