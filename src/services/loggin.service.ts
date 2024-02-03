import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable()
export class LogginService {
  private _isLoggedIn$ = new Subject<boolean>();

  constructor() {
    this._isLoggedIn$.next(false);
  }

  logIn() {
    this._isLoggedIn$.next(true);
  }

  logOut() {
    this._isLoggedIn$.next(false);
  }

  getLogInStatus(): Observable<boolean> {
    return this._isLoggedIn$.asObservable();
  }
}
