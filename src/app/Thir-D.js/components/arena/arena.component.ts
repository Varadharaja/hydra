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

    

    document.onkeydown = function(e) {
     //WebglUtils.doAnimate = true;
            switch (e.keyCode) {

          case 37:
            WebglUtils.rotateY(WebglUtils.mov_matrix,0.01);
              //alert('left');
              break;
          case 38:
              //alert('up');
              WebglUtils.view_matrix[14]+=0.05;
              break;
          case 39:
              WebglUtils.rotateY(WebglUtils.mov_matrix, -0.01);
          break;
          case 40:
              //alert('down');
              WebglUtils.view_matrix[14]-=0.05;
              break;
      }
      //WebglUtils.doAnimate = false;
  };

  }

  ngOnInit() {
   
  }

  AddShape(shape: IShape)
  {
    if (WebglUtils.canvas == null)
    {
      this.webglUtils.Initialize("glcanvas");
      WebglUtils.animate(0);

      WebglUtils.canvas.onclick = function(e:any){
        WebglUtils.doAnimate = !WebglUtils.doAnimate;
        if (WebglUtils.doAnimate)
        {
            WebglUtils.animate(WebglUtils.time_old);
        }
    };
    } 

    switch(Number(shape.Type))
    {
      case ShapeTypes.CUBE:

      let cbe = new Cube(shape.Name, 1, 1, 1, shape.Color);

      cbe.SetPlanes();

      this.webglUtils.SetWebGLParams(cbe.Planes);
      WebglUtils.doAnimate = true;
      WebglUtils.animate(0);
      WebglUtils.doAnimate = true;
      

      break;
      case ShapeTypes.POLYGON:
      break;
      case ShapeTypes.SPHERE:
      break;

    }

  }

}
