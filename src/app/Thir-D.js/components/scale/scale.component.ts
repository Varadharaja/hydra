import { Component, OnInit, Input } from '@angular/core';
import { Scale } from '../../contracts/scale';
import { IComponent } from 'src/app/IComponent';

@Component({
  selector: 'app-scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.css']
})
export class ScaleComponent implements OnInit, IComponent {
  @Input()
  parent: any;
  
  @Input()
  data: Scale;
  constructor() { }

  ngOnInit() {
  }

}
