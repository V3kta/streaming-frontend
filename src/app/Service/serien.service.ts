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

  refreshUserSerien(user: User): Observable<Serie[]> {
    console.log(user);
    return this.http.post<Serie[]>(
      'http://localhost:8080/serie/user/refresh',
      user
    );
  }

  refreshSameViewer(serie: Serie): Observable<User[]> {
    console.log(serie);
    return this.http.post<User[]>(
      'http://localhost:8080/user/serie/refresh/same',
      serie
    );
  }

  loadSerien(): Observable<Serie[]> {
    return this.http.get<Serie[]>('http://localhost:8080/serie/refresh/all');
  }

  saveSerie(serie: Serie): void {
    this.http.post('http://localhost:8080/serie/user/save', serie);
  }

  deleteSerie(serie: Serie): void {
    this.http.post('http://localhost:8080/serie/user/delete', serie);
  }
}
