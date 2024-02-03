import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DatenbankService } from '../services/datenbank.service';
import { Status } from './status.enum';
import { Strafe } from './strafe';

@Component({
  imports: [CommonModule],
  selector: 'app-strafe',
  templateUrl: './strafe.component.html',
  styleUrls: ['./strafe.component.css'],
  standalone: true,
})
export class StrafeComponent implements OnInit {
  @Input()
  strafe: Strafe = new Strafe();
  @Input()
  loggedIn: boolean = false;
  isEditActive = false;
  statusList = Object.keys(Status);

  constructor(private _dbService: DatenbankService) {}

  ngOnInit() {}

  goToEditMode() {
    this.isEditActive = true;
  }

  save() {
    this.isEditActive = false;
    if (this.strafe != null) {
      this._dbService.updateStrafe(this.strafe);
    }
  }

  changeName(e: any) {
    e.target.value == null
      ? (this.strafe.name = '')
      : (this.strafe.name = e.target.value);
  }

  changeStrafe(e: any) {
    e.target.value == null || e.target.value == ''
      ? (this.strafe.strafe = 0)
      : (this.strafe.strafe = e.target.value);
  }

  changeStatus(e: any) {
    e.target.value == null
      ? (this.strafe.status = Status.offen)
      : (this.strafe.status = e.target.value);
  }

  changeKommentar(e: any) {
    e.target.value == null
      ? (this.strafe.kommentar = '')
      : (this.strafe.kommentar = e.target.value);
  }
}
