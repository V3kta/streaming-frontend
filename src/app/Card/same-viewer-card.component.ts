import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-same-viewer-card',
  templateUrl: './same-viewer-card.component.html',
  styleUrls: ['./same-viewer-card.component.scss']
})
export class SameViewerCardComponent implements OnInit {

  @Input() viewerData: User;
  constructor() { }

  ngOnInit(): void {
  }

}
