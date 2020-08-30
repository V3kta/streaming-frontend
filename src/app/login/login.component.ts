import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usernameControl: FormControl;
  passwordControl: FormControl;
  returnUrl: string;

  constructor(
    private authService: AuthenticationService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['home']);
    }
  }

  ngOnInit(): void {
    this.usernameControl = new FormControl('');
    this.passwordControl = new FormControl('');
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(): void {
    this.authService
      .login(this.usernameControl.value, this.passwordControl.value)
      .subscribe((user) => {
        if (user === this.authService.currentUserValue) {
          this.router.navigate(['home']);
          return;
        }
        this.alertService.openAlert('Benutzername oder Passwort falsch!');
      });
  }

  registerActivation(): void {
    this.router.navigate(['register']);
  }
}
