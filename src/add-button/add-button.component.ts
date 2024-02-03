import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { DatenbankService } from '../services/datenbank.service';
import { LogginService } from '../services/loggin.service';
import { Status } from '../strafe/status.enum';
import { Strafe } from '../strafe/strafe';

@Component({
  imports: [CommonModule],
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css'],
  standalone: true,
})
export class AddButtonComponent implements OnInit {
  newStrafe = new Strafe();
  statusList = Object.keys(Status);
  @Input()
  isloggedIn = false;

  constructor(
    private _loginService: LogginService,
    private _dbService: DatenbankService
  ) {}

  ngOnInit() {}

  openDialog(dialog: any) {
    this.newStrafe = new Strafe();
    this.newStrafe.id = this._dbService.getNextId();
    dialog.showModal();
  }

  SafeStrafe(dialog: any, close = false) {
    if (close) {
      this._dbService.addStrafe(this.newStrafe);
    }
    dialog.close();
  }

  changeName(e: any) {
    e.target.value == null
      ? (this.newStrafe.name = '')
      : (this.newStrafe.name = e.target.value);
  }

  changeStrafe(e: any) {
    e.target.value == null || e.target.value == ''
      ? (this.newStrafe.strafe = 0)
      : (this.newStrafe.strafe = e.target.value);
  }

  changeStatus(e: any) {
    e.target.value == null
      ? (this.newStrafe.status = Status.offen)
      : (this.newStrafe.status = e.target.value);
  }

  changeKommentar(e: any) {
    e.target.value == null
      ? (this.newStrafe.kommentar = '')
      : (this.newStrafe.kommentar = e.target.value);
  }
}
