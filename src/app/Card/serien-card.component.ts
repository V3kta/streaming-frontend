import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Serie } from 'src/app/model/Serie';
import { User } from 'src/app/model/User';
import { SerienService } from 'src/app/service/serien.service';

@Component({
  selector: 'app-serien-card',
  templateUrl: './serien-card.component.html',
  styleUrls: ['./serien-card.component.scss']
})
export class SerienCardComponent implements OnInit {

  @Input() serieData: Serie;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }

  // löscht Serie aus der Datenbank

  deleteSerie(): void {
    this.refreshList.emit(this.serieData.id);
  }

}
