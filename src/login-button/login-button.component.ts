import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { DatenbankService } from '../services/datenbank.service';
import { LogginService } from '../services/loggin.service';

@Component({
  imports: [CommonModule],
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css'],
  standalone: true,
})
export class LoginButtonComponent implements OnInit {
  @Input()
  isloggedIn = false;
  username = '';
  password = '';
  errorText = '';

  constructor(
    private _loginService: LogginService,
    private _dbService: DatenbankService
  ) {}

  ngOnInit() {}

  logIn() {
    this._loginService.logIn();
  }

  logOut() {
    this._loginService.logOut();
  }

  checkPasswort(dialog: any) {
    const anmeldung = this._dbService.checkAnmeldung(
      this.username,
      this.password
    );
    if (anmeldung) {
      this.errorText = '';
      this.logIn();
      dialog.close();
    } else {
      this.errorText = 'Login error';
    }
  }

  changeUserName(e: any) {
    if (e != null) {
      e.target.value == null
        ? (this.username = '')
        : (this.username = e.target.value);
    }
  }

  changePasswort(e: any) {
    if (e != null) {
      e.target.value == null
        ? (this.password = '')
        : (this.password = e.target.value);
    }
  }

  openDialog(dialog: any) {
    this.errorText = '';
    this.username = '';
    this.password = '';
    dialog.showModal();
  }
}
