import { Component, OnInit, Input } from '@angular/core';
import { Color } from '../../contracts/color';
import { IComponent } from 'src/app/IComponent';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit, IComponent  {
  parent: any;
  @Input()
  data: Color;
  
  constructor() { }

  ngOnInit() {
  }

  toHex(d: number) {
    return  ("0"+(Number(d).toString(16))).slice(-2).toUpperCase()
}

}
