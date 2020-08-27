import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  usernameControl: FormControl;
  passwordControl: FormControl;
  vornameControl: FormControl;
  nachnameControl: FormControl;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.usernameControl = new FormControl('');
    this.passwordControl = new FormControl('');
    this.vornameControl = new FormControl('');
    this.nachnameControl = new FormControl('');
  }

  register(): void {
    if (
      this.usernameControl.value &&
      this.passwordControl.value &&
      this.vornameControl.value &&
      this.nachnameControl.value
    ) {
      this.authService
        .registerUser(
          this.usernameControl.value,
          this.passwordControl.value,
          this.vornameControl.value,
          this.nachnameControl.value
        )
        .subscribe((result) => {
          if (result === 'FORBIDDEN') {
            console.log(result);
            this.alertService.openAlert('Nutzername bereits vergeben!');
            return;
          }
          this.router.navigate(['login']);
          return;
        });
    } else {
      this.alertService.openAlert('Alle Felder müssen ausgefüllt werden!');
    }


  }
}
