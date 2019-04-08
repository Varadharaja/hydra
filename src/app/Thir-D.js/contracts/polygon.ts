import { Shape } from './shape';
import { Angle } from './angle';
import { Plane } from './plane';
import { Point } from './point';
import { GxUtils } from './gxUtils';
import { Transformation } from './transformation';
import { Color } from './color';
import { ShapeTypes } from './ShapeTypes';
import { IShape } from './IShape';
import { PlaneColors } from './PlaneColor';
import { NumRanges } from './range';
import { Scale } from './scale';

// Regular Polygon in 3D
//  Eg., Number of sides - 6
//
//      Top Face - Single side length - A 
//      ______
//     /      \   Top face angle (TopAngle) with respect to X-Axis = 0
//    |\______/|
//    |        |
//    |        |    Height of the polygon - H
//    |        |
//    |        |
//    | _ _ _ _|   Bottom Face - Single Side Length - B
//    |/       \    In this case A = B
//     \_______/    Bottom face angle (BottomAngle) with respect to x - Axis = 0
//  -----------------------------------------------------------------------------> X - axis
//           
//      
//      


export class Polygon extends Shape
{

    // Basic properties of the Shape
    SidesCount: number; 
    A: number;
    B: number;
    H: number;

    TopFaceInclination : Angle;
    BottomFaceInclination: Angle;

    
    SetPlanes= (): void =>
    {
        let planes: Plane[] = new Array();
        let theta = Math.PI * (1 / 2 - 1 / this.SidesCount);

        let R1 = this.A/2 * 1 / Math.cos(theta);
        let R2 = this.B/2 * 1 / Math.cos(theta);

        let alpha = 2 * Math.PI/this.SidesCount;
        let topFacePoints: Point[] = new Array();
        let bottomFacePoints: Point[] = new Array();

        let origin = this.Transformation != null &&
                    this.Transformation.Translation != null ? this.Transformation.Translation :  new Point(0, 0, 0);

        for (let sideIdx= 0; sideIdx < this.SidesCount; sideIdx++)
        {
            let topPt =     new Point(
                origin.x + R1 * Math.cos(sideIdx * alpha),
                origin.y + this.H,
                origin.z + R1 * Math.sin(sideIdx * alpha)
           );

           let pt = new Point(
                origin.x + R2 * Math.cos(sideIdx * alpha),
                origin.y,
                origin.z + R2 * Math.sin(sideIdx * alpha)
            );

            topFacePoints[sideIdx] = topPt;
            bottomFacePoints[sideIdx] = pt;
        }

        if (this.TopFaceInclination != null)
        {
            topFacePoints = GxUtils.TransformPlanes(
                [new Plane(topFacePoints, new Color(0, 0, 0, 1))],
                 new Transformation(new Point(0, 0 , 0), this.TopFaceInclination, new Angle(0, 0 , 0), new Scale(1, 1, 1))
            )[0].Points;
        }

        if (this.BottomFaceInclination != null)
        {
            bottomFacePoints = GxUtils.TransformPlanes(
                [new Plane(bottomFacePoints, new Color(0, 0, 0, 1))],
                 new Transformation(new Point(0, 0 , 0),this.BottomFaceInclination, new Angle(0, 0 , 0), new Scale(1, 1, 1))
            )[0].Points;
        }


        planes[planes.length] = new Plane(topFacePoints, this.Color,this.Id);
        planes[planes.length] = new Plane(bottomFacePoints, this.Color,this.Id);


        for (let sideIdx = 0; sideIdx < this.SidesCount; sideIdx++)
        {
            let facePoints: Point[] = new Array();
            let idx1 = sideIdx;
            let idx2 = ((sideIdx+1) == this.SidesCount) ? 0 : sideIdx + 1;
            facePoints = 
            [
                topFacePoints[idx1],
                topFacePoints[idx2],
                bottomFacePoints[idx2],
                bottomFacePoints[idx1]
            ];

            planes[planes.length] = new Plane(facePoints,this.Color,this.Id);

        }

        this.Planes = planes;

        this.ApplyPlaneColors();

    }

    constructor(name: string , sides: number, a: number, b: number, h: number, color: Color,
                tAng : Angle = new Angle(0 , 0, 0), bAng: Angle= new Angle(0, 0, 0))
    {
        super(name);
        this.Type = ShapeTypes.POLYGON;
        this.SidesCount =sides;

        this.A = a;
        this.B = b;
        this.H = h;
        this.Color = color;
        this.TopFaceInclination = tAng;
        this.BottomFaceInclination = bAng;

    }

    Clone = (): IShape =>
    {
        let cloneShape  = new Polygon(this.Name, this.SidesCount, this.A, this.B, this.H, this.Color);
        return cloneShape;
    }

    static Import(shp:any):Polygon
    {
        let poly = new Polygon(shp.Name,shp.SidesCount,shp.A,shp.B,shp.H, Color.Import(shp.Color));
        poly.Transformation = Transformation.Import(shp.Transformation);
        poly.HiddenPlanes = shp.HiddenPlanes;
        poly.PlaneColors = PlaneColors.Import(shp.PlaneColors);

        if (shp.TopFaceInclination != null)
        {
            poly.TopFaceInclination = new Angle(shp.TopFaceInclination.alpha, shp.TopFaceInclination.beta, shp.TopFaceInclination.gamma);
        }

        if (shp.BottomFaceInclination != null)
        {
            poly.BottomFaceInclination = new Angle(shp.BottomFaceInclination.alpha, shp.BottomFaceInclination.beta, shp.BottomFaceInclination.gamma);
        }
        poly.VisibleRanges = NumRanges.Import(shp.VisibleRanges);

        return poly;
    }

}