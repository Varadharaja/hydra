import { Component, OnInit, Input } from '@angular/core';
import { Color } from '../../contracts/color';
import { IComponent } from 'src/app/IComponent';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit, IComponent  {
  @Input()
  data: Color = new Color(255, 255, 255, 1);
  constructor() { }

  ngOnInit() {
  }

}
