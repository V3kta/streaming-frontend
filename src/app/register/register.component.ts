import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/service/alert.service';

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
  registerForm: any;

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
        email: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
        verifyPassword: ['', Validators.required],
        vorname: ['', Validators.required],
        nachname: ['', Validators.required],
      },
      { validator: this.passwordValidator }
    );
  }

  register(): void {}

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

  passwordValidator(form: FormGroup): any {
    const condition =
      form.get('password').value !== form.get('verifyPassword').value;

    return condition ? { passwordsDoNotMatch: true } : null;
  }
}
