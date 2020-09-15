import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Serie } from 'src/app/model/Serie';
import { User } from 'src/app/model/User';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import * as lodash from 'lodash-es';

@Injectable({
  providedIn: 'root',
})
export class SerienService {
  constructor(private http: HttpClient) {}

  getSerien(): Observable<Serie[]> {
    return this.http.get<Serie[]>('http://localhost:8080/serien');
  }

  getUserSerien(userId: number): Observable<Serie[]> {
    return this.http
      .get<Serie[]>(
        `http://localhost:8080/user/${userId}/serien?sorting=${localStorage.getItem(
          'sorting'
        )}`
      )
      .pipe(
        map((userSerien) => {
          userSerien.forEach((serie) => {
            serie.zgDatum = moment(serie.zgDatum, 'YYYY-MM-DD').format(
              'DD.MM.YYYY'
            );
          });
          return userSerien;
        })
      );
  }

  getViewers(serieId: number): Observable<User[]> {
    return this.http.get<User[]>(
      `http://localhost:8080/serien/${serieId}/user`
    );
  }

  saveUserSerie(userId: number, serie: Serie): Observable<string> {
    const serieClone = lodash.clone(serie);
    serieClone.zgDatum = moment(serie.zgDatum, 'DD.MM.YYYY').format(
      'YYYY-MM-DD'
    );
    return this.http.post<string>(
      `http://localhost:8080/user/${userId}/serien`,
      serieClone
    );
  }

  deleteUserSerie(userId: number, serieId: number): Observable<string> {
    return this.http.delete<string>(
      `http://localhost:8080/user/${userId}/serien/${serieId}`
    );
  }
}
