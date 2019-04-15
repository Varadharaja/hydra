import { Component, OnInit } from '@angular/core';
import { IComponent } from 'src/app/IComponent';

@Component({
  selector: 'app-transformation',
  templateUrl: './transformation.component.html',
  styleUrls: ['./transformation.component.css']
})
export class TransformationComponent implements OnInit, IComponent {

  data: any;
  parent: any;

  constructor() { }

  ngOnInit() {
  }

}
