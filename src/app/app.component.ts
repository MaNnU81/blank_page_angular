import { Component, input } from '@angular/core';

import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/home/home.component";
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  imports: [ HeaderComponent, HomeComponent, MatButtonModule, MatSidenavModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showFiller = false;
  title = 'blank_page_angular';
  isHomeSidenavOpen = false;

  openSidenav() {
    this.isHomeSidenavOpen = !this.isHomeSidenavOpen
    }

  
}
