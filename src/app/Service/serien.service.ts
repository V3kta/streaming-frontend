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

  refreshAllSerien(): Observable<Serie[]> {
    return this.http.get<Serie[]>('http://localhost:8080/serie/refresh/all');
  }

  refreshUserSerien(userId: number): Observable<Serie[]> {
    return this.http.get<Serie[]>(
      `http://localhost:8080/serie/user/refresh/${userId}`
    );
  }

  refreshSameViewer(serieId: number): Observable<User[]> {
    return this.http.get<User[]>(
      `http://localhost:8080/user/serie/refresh/same/${serieId}`
    );
  }

  saveUserSerie(u: User, s: Serie): Observable<string> {
    return this.http.post<string>('http://localhost:8080/serie/user/save', {
      userDto: u,
      serieDto: s,
    });
  }

  deleteUserSerie(uId: number, sId: number): Observable<string> {
    return this.http.post<string>('http://localhost:8080/serie/user/delete', {
      userId: uId,
      serieId: sId,
    });
  }
}
