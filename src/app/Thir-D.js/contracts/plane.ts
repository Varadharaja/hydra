import { Point } from './point';
import { Color } from './color';

export class Plane
{

    Points: Point[];
    Color: Color;
    ShapeId: string;
    ShouldHide: boolean = false;

    constructor(pts: Point[], color: Color, shapeId: string = "")
    {
        this.Points = pts;
        this.Color = color;
        if (shapeId != "")
        {
            this.ShapeId = shapeId;
        }
    }
    
}