import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Serie } from 'src/app/model/Serie';
import { User } from 'src/app/model/User';
import { SerienService } from 'src/app/service/serien.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-serien-card',
  templateUrl: './serien-card.component.html',
  styleUrls: ['./serien-card.component.scss']
})
export class SerienCardComponent implements OnInit {

  @Input() serieData: Serie;
  @Input() viewerData: User;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  faTrash = faTrash;

  ngOnInit(): void {
  }

  // löscht Serie aus der Datenbank

  deleteSerie(): void {
    this.refreshList.emit(this.serieData.id);
  }

}
