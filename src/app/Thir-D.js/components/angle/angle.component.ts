import { Component, OnInit, OnChanges , SimpleChanges, Input} from '@angular/core';
import { Angle } from '../../contracts/angle';
import { Observable } from 'rxjs';
import { IComponent } from 'src/app/IComponent';

@Component({
  selector: 'app-angle',
  templateUrl: './angle.component.html',
  styleUrls: ['./angle.component.css']
})
export class AngleComponent implements OnInit, IComponent {

  @Input()
  parent: any;

  @Input() data: Angle = new Angle(0,0,0);
  constructor() { }

  ngOnInit() {
  }

}
