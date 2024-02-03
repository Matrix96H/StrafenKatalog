import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DatenbankService } from '../services/datenbank.service';

@Component({
  imports: [CommonModule],
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  standalone: true,
})
export class FilterComponent implements OnInit {
  @Input()
  buttonText = '';
  @Input()
  index = -1;
  isActive = false;
  constructor(private _dbServer: DatenbankService) {}

  ngOnInit() {}

  changeFilterState() {
    this.isActive = !this.isActive;
    this._dbServer.setFilterStatus(this.isActive, this.index);
  }
}
