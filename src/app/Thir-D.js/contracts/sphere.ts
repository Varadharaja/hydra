import { Shape } from './shape';
import { Color } from './color';
import { ShapeTypes } from './ShapeTypes';
import { Point } from './point';
import { Plane } from './plane';
import { IShape } from './IShape';
import { Transformation } from './transformation';
import { PlaneColors } from './PlaneColor';
import { NumRanges } from './range';

export class Sphere extends Shape
{
    Radius: number;
    xPartitions: number;
    yPartitions: number;
    yPartStart: number;
    yPartEnd: number;

    constructor(name: string, r: number, xParts: number, yParts: number, clr: Color)
    {
        super(name);
        this.Type = ShapeTypes.SPHERE;
        this.Radius = r;
        this.xPartitions = xParts;
        this.yPartitions = yParts;

        this.Color = clr;
    }

    SetPlanes = (): void=>
    {
        let origin = new Point(0,0,0);

        
        let planes: Plane[] = new Array();

        this.yPartStart = this.yPartStart ==  null ? 0 : this.yPartStart;
        this.yPartEnd = this.yPartEnd ==  null ? this.yPartitions : this.yPartEnd;

        for (let yParts = this.yPartStart; yParts <= this.yPartEnd; yParts++)
        {
            let points: Point[] = new Array();
            for (let xParts=0; xParts <= this.xPartitions; xParts++)
            {
                let theta: number = 2 * Math.PI * xParts/ this.xPartitions; 
                let z: number = origin.z - this.Radius + (2 * this.Radius * yParts / this.yPartitions);
                let r: number = 0;
                r = Math.sqrt(this.Radius * this.Radius - z * z);

                let x: number = origin.x + r * Math.cos(theta); 
                let y: number = origin.y + r * Math.sin(theta); 

                let pt : Point = new Point(x,y,z);

                points[points.length] = pt;
            }

            let plane: Plane = new Plane(points, this.Color, this.Id);

            planes[planes.length] = plane;

        }
        this.Planes = new Array();
        for (let plCnt = 0; plCnt < planes.length; plCnt++)
        {


            for (let ptsCnt=0; ptsCnt < planes[plCnt].Points.length; ptsCnt++)
            {
                let pts: Point[] = new Array();
                 if (plCnt == planes.length-1)
                {
                    pts[pts.length] = planes[plCnt].Points[ptsCnt];
                    pts[pts.length] = planes[0].Points[ptsCnt];
                    if (ptsCnt == planes[plCnt].Points.length-1)
                    {
                        pts[pts.length] = planes[0].Points[0];
                        pts[pts.length] = planes[plCnt].Points[0];
                    }
                    else
                    {
                        pts[pts.length] = planes[0].Points[ptsCnt+1];
                        pts[pts.length] = planes[plCnt].Points[ptsCnt+1];
                    }
                }
                else
                {
                    pts[pts.length] = planes[plCnt].Points[ptsCnt];
                    pts[pts.length] = planes[plCnt+1].Points[ptsCnt];
                    if (ptsCnt == planes[plCnt].Points.length-1)
                    {
                        pts[pts.length] = planes[plCnt+1].Points[0];
                        pts[pts.length] = planes[plCnt].Points[0];
                    }
                    else
                    {
                        pts[pts.length] = planes[plCnt+1].Points[ptsCnt+1];
                        pts[pts.length] = planes[plCnt].Points[ptsCnt+1];
                    }

                }
                let pln: Plane = new Plane(pts, this.Color, this.Id);
                this.Planes[this.Planes.length] = pln;
            }

        }

        this.Planes[this.Planes.length] = planes[0];
        this.Planes[this.Planes.length] = planes[planes.length-1];

        var txl = this.Transformation.Translation;

        if (txl != null )
        {
            this.Planes.forEach((element: Plane) => 
            {
                element.Points.forEach((pt: Point) =>
                {
                    pt.x += txl.x;
                    pt.y += txl.y;
                    pt.z += txl.z;

                })

            });
        }
        this.ApplyPlaneColors();
  }

    Clone = (): IShape =>
    {
        let cloneShape  = new Sphere(this.Name,this.Radius,this.xPartitions,this.yPartitions, this.Color);
        return cloneShape;
    }

    static Import(shp:any): Sphere
    {
        let sphere = new Sphere(shp.Name,shp.Radius,shp.xPartitions,shp.yPartitions,Color.Import(shp.Color));
        sphere.Transformation = Transformation.Import(shp.Transformation);
        sphere.yPartStart = shp.yPartStart;
        sphere.yPartEnd = shp.yPartEnd;
        sphere.HiddenPlanes = shp.HiddenPlanes;
        sphere.PlaneColors = PlaneColors.Import(shp.PlaneColors);
        sphere.HiddenRanges = NumRanges.Import(shp.HiddenRanges);
        sphere.VisibleRanges = NumRanges.Import(shp.VisibleRanges);
        return sphere;
    
    }
}