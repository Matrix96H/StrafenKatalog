import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { HomeComponent } from './home/home.component';
import { DatenbankService } from './services/datenbank.service';
import { LogginService } from './services/loggin.service';
import { StrafeComponent } from './strafe/strafe.component';

@Component({
  imports: [StrafeComponent, HomeComponent],
  providers: [LogginService, DatenbankService],
  selector: 'app-root',
  standalone: true,
  template: `<app-home></app-home>`,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
