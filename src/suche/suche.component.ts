import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DatenbankService } from '../services/datenbank.service';

@Component({
  imports: [CommonModule],
  selector: 'app-suche',
  templateUrl: './suche.component.html',
  styleUrls: ['./suche.component.css'],
  standalone: true,
})
export class SucheComponent implements OnInit {
  spielerList: Observable<Array<string>> = of([]);
  suche: string = '';
  constructor(private _dbService: DatenbankService) {
    this.spielerList = this._dbService.getNames$();
  }

  ngOnInit() {}

  filterName() {
    this._dbService.setFilterName(this.suche);
  }

  changeSuche(e: any) {
    e.target.value == null ? (this.suche = '') : (this.suche = e.target.value);
  }
}
