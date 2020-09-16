import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/service/alert.service';
import { CrossFieldErrorMatcher } from 'src/app/model/CrossFieldErrorMatcher';
import { StatusCodes } from 'http-status-codes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  // emailControl: FormControl;
  // usernameControl: FormControl;
  // passwordControl: FormControl;
  // vornameControl: FormControl;
  // nachnameControl: FormControl;
  registerForm: FormGroup;
  passErrorMatcher: CrossFieldErrorMatcher;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.emailControl = new FormControl('');
    // this.usernameControl = new FormControl('');
    // this.passwordControl = new FormControl('');
    // this.vornameControl = new FormControl('');
    // this.nachnameControl = new FormControl('');

    this.registerForm = this.formBuilder.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('\\w{1,}(\\.|_){0,1}\\w{1,}@\\w{1,}\\.\\w{1,}'),
          ],
        ],
        username: [
          '',
          [Validators.required, Validators.pattern('\\w{3,} {0,1}\\w{0,}')],
        ],
        password: ['', Validators.required],
        verifyPassword: '',
        vorname: ['', Validators.required],
        nachname: ['', Validators.required],
      },
      { validator: this.comparePasswords }
    );

    this.passErrorMatcher = new CrossFieldErrorMatcher();
  }

  register(): void {
    if (!this.registerForm.invalid) {
      this.authService
        .registerUser(
          this.registerForm.get('email').value,
          this.registerForm.get('username').value,
          this.registerForm.get('password').value,
          this.registerForm.get('vorname').value,
          this.registerForm.get('nachname').value
        )
        .subscribe((status) => {
          if (status === 'CONFLICT') {
            console.log(status);
            this.alertService.openAlert('Username exisiert bereits!');
            return;
          }
          this.alertService.openAlert('Erfolgreich registriert!');
          this.router.navigateByUrl('login');
        });
    }
    if (this.registerForm.invalid) {
      this.alertService.openAlert('Formular nicht korrekt ausgefüllt!');
      return;
    }
  }

  // register(): void {
  //   if (
  //     this.emailControl.value &&
  //     this.usernameControl.value &&
  //     this.passwordControl.value &&
  //     this.vornameControl.value &&
  //     this.nachnameControl.value
  //   ) {
  //     this.authService
  //       .registerUser(
  //         this.emailControl.value,
  //         this.usernameControl.value,
  //         this.passwordControl.value,
  //         this.vornameControl.value,
  //         this.nachnameControl.value
  //       )
  //       .subscribe((result) => {
  //         if (result === 'FORBIDDEN') {
  //           console.log(result);
  //           this.alertService.openAlert('Nutzername bereits vergeben!');
  //           return;
  //         }
  //         this.router.navigate(['login']);
  //         return;
  //       });
  //   } else {
  //     this.alertService.openAlert('Alle Felder müssen ausgefüllt werden!');
  //   }
  // }

  comparePasswords(group: FormGroup): any {
    // here we have the 'passwords' group
    const pass = group.get('password').value;
    const verifyPass = group.get('verifyPassword').value;

    return pass === verifyPass ? null : { notSame: true };
  }
}
