import { Shape } from './shape';
import { Plane } from './plane';
import { Point } from './point';
import { IShape } from './IShape';
import { ShapeTypes } from './ShapeTypes';
import { Color } from './color';
import { Transformation } from './transformation';
import { PlaneColors } from './PlaneColor';

export class Cube extends Shape
{

    W: number;
    L: number;
    H: number;

    SetPlanes = (): void =>
    {
        let planes: Plane[] = new Array();
        let topFacePoints: Point[] = new Array();
        let bottomFacePoints: Point[] = new Array();

        let origin = this.Transformation != null &&
                        this.Transformation.Translation != null ? this.Transformation.Translation :  new Point(0,0,0);

        topFacePoints =  [
            new Point(origin.x , origin.y,origin.z),
            new Point(origin.x + this.L, origin.y,origin.z),
            new Point(origin.x + this.L, origin.y,origin.z+ this.W),
            new Point(origin.x , origin.y,origin.z+ this.W)
        ];

        bottomFacePoints =  [
            new Point(origin.x , origin.y + this.H,origin.z),
            new Point(origin.x + this.L, origin.y+ this.H,origin.z),
            new Point(origin.x + this.L, origin.y+ this.H,origin.z+ this.W),
            new Point(origin.x , origin.y+ this.H,origin.z+ this.W)
        ];

        planes[planes.length] = new Plane(topFacePoints, this.Color, this.Id);
        planes[planes.length] = new Plane(bottomFacePoints, this.Color,this.Id);


        for (let sideIdx = 0; sideIdx < 4; sideIdx++)
        {
            let facePoints: Point[] = new Array();
            let idx1 = sideIdx;
            let idx2 = ((sideIdx + 1) == 4) ? 0 : sideIdx + 1;
            facePoints = 
            [
                topFacePoints[idx1],
                topFacePoints[idx2],
                bottomFacePoints[idx2],
                bottomFacePoints[idx1]
            ];

            let colorModifier = 10 * sideIdx;
            let r1 = this.Color.red*255 - colorModifier;
            let g1 = this.Color.green*255 - colorModifier;
            let b1 = this.Color.blue*255 - colorModifier;

            let faceColor = new Color(r1,g1,b1);

            planes[planes.length] = new Plane(facePoints,faceColor, this.Id);

        }

        this.Planes =  planes;

        this.ApplyPlaneColors();
    }

    Clone = (): IShape =>
    {
       let cube: Cube = new Cube(this.Name, this.L, this.W, this.H, this.Color);

        return cube;
    }

    constructor(name: string, l: number, w: number, h: number, clr: Color)
    {
        super(name);
        this.Type = ShapeTypes.CUBE;
        this.L =l;
        this.W = w;
        this.H = h;
        this.Color = clr;

    }

    static Import(shp:any ): Cube
    {
        let cube = new Cube(shp.Name,shp.L,shp.W,shp.H, Color.Import(shp.Color));
        cube.Transformation = Transformation.Import(shp.Transformation);
        cube.HiddenPlanes = shp.HiddenPlanes;
        cube.PlaneColors = PlaneColors.Import(shp.PlaneColors);
        return cube;
    }


}