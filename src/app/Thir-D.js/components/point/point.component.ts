import { Component, OnInit, Input } from '@angular/core';
import { Point } from '../../contracts/point';
import { IComponent } from 'src/app/IComponent';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.css']
})
export class PointComponent implements OnInit,IComponent {
  @Input()
  parent: any;

  @Input()
  data: Point = new Point(0,0,0);

  constructor() { 

  }

  ngOnInit() {

  }

}
