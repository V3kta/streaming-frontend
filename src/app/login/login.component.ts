import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { User } from 'src/app/model/User';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

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
      .validateLogin(this.usernameControl.value, this.passwordControl.value)
      .subscribe((user) => {
        if (user === this.authService.currentUserValue) {
          this.router.navigate(['home']);
        }
      });
  }
}
