import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/model/User';
import { map } from 'rxjs/operators';
import { SettingsService } from 'src/app/service/settings.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  logout(): void {
    // remove user from local storage to log user out
    localStorage.clear();
    this.currentUserSubject.next(null);
  }

  login(uLogin: string, uPw: string): Observable<User> {
    return this.http
      .post<User>('http://localhost:8080/user/login', {
        login: uLogin,
        password: uPw,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
          }
        })
      );
  }

  registerUser(
    uEmail: string,
    uName: string,
    uPass: string,
    uVorname: string,
    uNachname: string
  ): Observable<string> {
    return this.http.post<string>('http://localhost:8080/user/register', {
      email: uEmail,
      username: uName,
      password: uPass,
      vorname: uVorname,
      nachname: uNachname,
    });
  }

  changePassword(uOldPw: string, uNewPw: string): Observable<string> {
    return this.http.post<string>('http://localhost:8080/user/password', {
      id: this.currentUserValue.id,
      oldPassword: uOldPw,
      newPassword: uNewPw,
    });
  }

  changeEmail(uEmail: string): Observable<string> {
    return this.http.post<string>('http://localhost:8080/user/email', {
      id: this.currentUserValue.id,
      email: uEmail,
    });
  }

  changeUsername(uName: string): Observable<string> {
    return this.http.post<string>('http://localhost:8080/user/username', {
      id: this.currentUserValue.id,
      username: uName,
    });
  }
}
