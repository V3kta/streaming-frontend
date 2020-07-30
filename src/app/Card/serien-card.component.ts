import { Component, OnInit, Input } from '@angular/core';
import { Serie } from 'src/app/model/Serie';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-serien-card',
  templateUrl: './serien-card.component.html',
  styleUrls: ['./serien-card.component.scss']
})
export class SerienCardComponent implements OnInit {

  @Input() serieData: Serie;
  @Input() viewerData: User[];
  constructor() { }

  ngOnInit(): void {
  }

}
