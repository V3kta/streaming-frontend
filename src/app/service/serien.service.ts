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

  getSerien(): Observable<Serie[]> {
    return this.http.get<Serie[]>('http://localhost:8080/serien');
  }

  getUserSerien(userId: number): Observable<Serie[]> {
    return this.http.get<Serie[]>(
      `http://localhost:8080/user/${userId}/serien`
    );
  }

  getViewers(serieId: number): Observable<User[]> {
    return this.http.get<User[]>(
      `http://localhost:8080/serien/${serieId}/user`
    );
  }

  saveUserSerie(userId: number, serie: Serie): Observable<string> {
    return this.http.post<string>(`http://localhost:8080/user/${userId}/serien`, serie);
  }

  deleteUserSerie(userId: number, serieId: number): Observable<string> {
    return this.http.delete<string>(`http://localhost:8080/user/${userId}/serien/${serieId}`);
  }
}
