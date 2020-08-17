import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Serie } from 'src/app/model/Serie';
import { User } from 'src/app/model/User';
import { SerienService } from 'src/app/service/serien.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-serien-card',
  templateUrl: './serien-card.component.html',
  styleUrls: ['./serien-card.component.scss'],
})
export class SerienCardComponent implements OnInit {
  constructor(private serienService: SerienService) {}

  @Input() serieData: Serie;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  faTrash = faTrash;
  sameViewerList: User[];

  ngOnInit(): void {}

  // aktualisiert Liste der User die Serie auch gesehen haben

  refreshSameViewer(): void {
    this.serienService
      .refreshSameViewer(this.serieData.id)
      .subscribe((result) => {
        this.sameViewerList = result;
      });
  }

  // löscht Serie aus der Datenbank

  deleteSerie(): void {
    this.refreshList.emit(this.serieData.id);
  }
}
