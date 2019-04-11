import { Component, OnInit } from '@angular/core';
import { IShape } from '../../contracts/IShape';
import { ShapeTypes } from '../../contracts/ShapeTypes';
import { Cube } from '../../contracts/cube';
import { WebglUtils } from '../../contracts/webglUtils';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.css']
})
export class ArenaComponent implements OnInit {

  webglUtils: WebglUtils = new WebglUtils();

  constructor() {
    
   
   }

  ngOnInit() {
  }

  AddShape(shape: IShape)
  {
    if (this.webglUtils.canvas == null)
    {
      this.webglUtils.Initialize("glcanvas");
    }

    switch(Number(shape.Type))
    {
      case ShapeTypes.CUBE:

      let cbe = new Cube(shape.Name, 1, 1, 1, shape.Color);

      cbe.SetPlanes();

      this.webglUtils.SetWebGLParams(cbe.Planes);
      this.webglUtils.doAnimate = true;
      this.webglUtils.animate(0);
      this.webglUtils.doAnimate = true;

      break;
      case ShapeTypes.POLYGON:
      break;
      case ShapeTypes.SPHERE:
      break;

    }

  }

}
