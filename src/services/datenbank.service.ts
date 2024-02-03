import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { Status } from '../strafe/status.enum';
import { Strafe } from '../strafe/strafe';
@Injectable()
export class DatenbankService {
  user: string = 'Admin';
  passwort: string = 'Admin';
  strafen: Array<Strafe> = [];
  strafen$ = new BehaviorSubject<Array<Strafe>>([]);
  nameFilter$ = new BehaviorSubject<string>('');
  filterOffen$ = new BehaviorSubject<boolean>(false);
  filterGeschlossen$ = new BehaviorSubject<boolean>(false);
  filteredStrafen$ = new BehaviorSubject<Array<Strafe>>([]);
  namesList$ = new BehaviorSubject<Array<string>>([]);
  summe$ = new BehaviorSubject<number>(0);

  constructor() {
    combineLatest([
      this.nameFilter$,
      this.filterOffen$,
      this.filterGeschlossen$,
      this.strafen$,
    ]).subscribe(([name, offen, geschlossen]) => {
      this.filteredStrafen$.next(this._filterStrafen(name, offen, geschlossen));
    });

    this.filteredStrafen$.subscribe((strafen) => {
      const names: Array<string> = [];
      strafen.forEach((strafe) => names.push(strafe.name));
      this.namesList$.next(
        names.filter((name, index) => names.indexOf(name) === index)
      );

      let summe: number = 0;
      const offeneStrafen = strafen.filter(
        (strafe) => strafe.status == Status.offen
      );
      offeneStrafen.forEach(
        (strafe) => (summe = summe + Number(strafe.strafe))
      );
      this.summe$.next(summe);
    });
  }

  checkAnmeldung(username: string, passwort: string): boolean {
    if (username == this.user && passwort == this.passwort) {
      return true;
    }
    return false;
  }

  getStrafenKatalog$(): Observable<Array<Strafe>> {
    return this.filteredStrafen$.asObservable();
  }

  getStrafenSumme$(): Observable<number> {
    return this.summe$.asObservable();
  }

  getNextId(): number {
    let nextId: number = -1;
    const indexList: Array<number> = [];
    this.strafen.forEach((strafe) => indexList.push(strafe.id));
    if (indexList.length != 0) {
      nextId = Math.max(...indexList);
    }
    nextId += 1;
    return nextId;
  }

  getNames$(): Observable<Array<string>> {
    return this.namesList$.asObservable();
  }

  setFilterName(filterName: string) {
    this.nameFilter$.next(filterName);
  }

  setFilterStatus(filter: boolean, index: number) {
    switch (index) {
      case 0: {
        this.filterOffen$.next(filter);
        break;
      }
      case 1: {
        this.filterGeschlossen$.next(filter);
        break;
      }
      default: {
        break;
      }
    }
  }

  addStrafe(newStrafe: Strafe) {
    this.strafen.push(newStrafe);
    this.strafen$.next(this.strafen);
  }

  updateStrafe(newStrafe: Strafe) {
    const index = this.strafen.findIndex((index) => index.id == newStrafe.id);
    this.strafen[index] = newStrafe;
    this.strafen$.next(this.strafen);
  }

  private _filterStrafen(
    name: string,
    filterOffen: boolean,
    filterClosed: boolean
  ): Array<Strafe> {
    let namefilterdStrafen: Array<Strafe> = [];
    if (name != '') {
      namefilterdStrafen = this.strafen.filter(
        (strafe) => strafe.name.toLocaleLowerCase() == name.toLocaleLowerCase()
      );
    } else {
      namefilterdStrafen = this.strafen;
    }
    let statusFilterdStrafen: Array<Strafe> = [];

    if (filterOffen == false && filterClosed == false) {
      return namefilterdStrafen;
    }
    if (filterOffen == true && filterClosed == true) {
      return statusFilterdStrafen;
    }
    if (filterOffen == true) {
      statusFilterdStrafen = namefilterdStrafen.filter(
        (strafe) => strafe.status == Status.offen
      );
    }
    if (filterClosed == true) {
      statusFilterdStrafen = namefilterdStrafen.filter(
        (strafe) => strafe.status == Status.geschlossen
      );
    }
    return statusFilterdStrafen;
  }
}
