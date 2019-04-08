import { Component } from '@angular/core';
import { Angle } from './Thir-D.js/contracts/angle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hydra';

  ang: Angle = new Angle(0,0,0);
}
