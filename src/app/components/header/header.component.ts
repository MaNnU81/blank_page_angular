import { Component, output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';







@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})


export class HeaderComponent {

    sidenavBtnClicked = output()

    emitSidenavClick() {
      this.sidenavBtnClicked.emit()
}

}
