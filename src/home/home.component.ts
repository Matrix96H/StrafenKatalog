import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { AddButtonComponent } from '../add-button/add-button.component';
import { BannerComponent } from '../banner/banner.component';
import { FilterComponent } from '../filter/filter.component';
import { LoginButtonComponent } from '../login-button/login-button.component';
import { DatenbankService } from '../services/datenbank.service';
import { LogginService } from '../services/loggin.service';
import { Status } from '../strafe/status.enum';
import { Strafe } from '../strafe/strafe';
import { StrafeComponent } from '../strafe/strafe.component';
import { SucheComponent } from '../suche/suche.component';

@Component({
  imports: [
    CommonModule,
    StrafeComponent,
    BannerComponent,
    SucheComponent,
    FilterComponent,
    LoginButtonComponent,
    AddButtonComponent,
  ],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
})
export class HomeComponent implements OnInit {
  strafen: Array<Strafe> = [];
  isloggedIn: boolean = false;
  summe$: Observable<number> = of(0);
  statusList = Object.keys(Status);

  constructor(
    private _loginService: LogginService,
    private _dbService: DatenbankService
  ) {
    this._loginService
      .getLogInStatus()
      .pipe(map((isloggedIn) => (this.isloggedIn = isloggedIn)))
      .subscribe();

    this.summe$ = this._dbService.getStrafenSumme$();

    this._dbService
      .getStrafenKatalog$()
      .subscribe((strafen) => (this.strafen = strafen));
  }

  ngOnInit() {}

  getSummeStrafen(): number {
    return 50;
  }
}
