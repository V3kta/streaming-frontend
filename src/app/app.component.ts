import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private authService: AuthenticationService) {}

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
