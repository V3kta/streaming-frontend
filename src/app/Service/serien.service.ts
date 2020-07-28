import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Serie } from 'src/app/model/Serie';

@Injectable({
  providedIn: 'root',
})
export class SerienService {
  constructor(private http: HttpClient) {}

  refresh(userId: number): Observable<Serie[]> {
    return this.http.get<Serie[]>(`http://localhost:8080/refresh/${userId}`);
  }

  save(serienList: Serie[]): void {
    this.http.post<Serie[]>('http://localhost:8080/get', serienList);
  }

  delete(serie: Serie): void {
    this.http.post<Serie>('http://localhost:8080/get', serie);
  }
}
