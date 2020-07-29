import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Serie } from 'src/app/model/Serie';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root',
})
export class SerienService {
  constructor(private http: HttpClient) {}

  refreshSerien(id: number): Observable<Serie[]> {
    return this.http.get<Serie[]>(`http://localhost:8080/refresh/${id}`);
  }

  saveSerien(serienList: Serie[]): void {
    this.http.post<Serie[]>('http://localhost:8080/save', serienList);
  }

  deleteSerie(serie: Serie): void {
    this.http.post<Serie>('http://localhost:8080/delete', serie);
  }
}
