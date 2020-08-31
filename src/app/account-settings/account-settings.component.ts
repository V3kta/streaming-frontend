import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/service/settings.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  constructor(private settingsService: SettingsService, private router: Router) { }

  ngOnInit(): void {
  }

  navigateByUrl(url: string): void {
    this.router.navigateByUrl(url);
  }



}
