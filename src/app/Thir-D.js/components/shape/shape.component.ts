import { Component, OnInit } from '@angular/core';
import { Shape } from '../../contracts/shape';
import { IComponent } from 'src/app/IComponent';
import { GxUtils } from '../../contracts/gxUtils';

@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeComponent implements OnInit, IComponent {

  data: Shape;

  constructor() {}

  ngOnInit() {
  }

}
