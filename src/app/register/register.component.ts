import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.usernameControl = new FormControl('');
    this.passwordControl = new FormControl('');
    this.vornameControl = new FormControl('');
    this.nachnameControl = new FormControl('');
  }

  register(): void {
    this.authService
      .registerUser(
        this.usernameControl.value,
        this.passwordControl.value,
        this.vornameControl.value,
        this.nachnameControl.value
      )
      .subscribe((result) => {
        console.log(result);
        return;
      });

    this.router.navigate(['login']);
  }
}
