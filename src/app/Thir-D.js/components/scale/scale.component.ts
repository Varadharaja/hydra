import { Component, OnInit } from '@angular/core';
import { Scale } from '../../contracts/scale';
import { IComponent } from 'src/app/IComponent';

@Component({
  selector: 'app-scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.css']
})
export class ScaleComponent implements OnInit, IComponent {

  data: Scale = new Scale(1, 1, 1);
  constructor() { }

  ngOnInit() {
  }

}
