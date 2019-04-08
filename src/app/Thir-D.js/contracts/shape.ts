import { IShape } from './IShape';
import { Plane } from './plane';
import { Transformation } from './transformation';
import { Color } from './color';
import { ShapeTypes } from './ShapeTypes';
import { PlaneColor } from './PlaneColor';
import { NumRange } from './range';
import { GxUtils } from './gxUtils';

export class Shape implements IShape
{
    Id: string;
    Name: string;
    Planes: Plane[];
    Transformation: Transformation;
    Color: Color;
    SetPlanes:()=> void;
    Type: ShapeTypes;
    Clone: () => IShape;
    ShouldHide: boolean = false;
    HiddenPlanes: number[];
    PlaneColors: PlaneColor[];
    HiddenRanges: NumRange[];
    VisibleRanges: NumRange[];

    constructor(Name: string)
    {

        this.Id =    GxUtils.NewGuid();
        this.Name = Name;
        this.Type = ShapeTypes.CUSTOM;
    }

    Move(){}
    Rotate(){}
    Zoom(){}


    TransformedPlanes()
    {
        return GxUtils.TransformPlanes(this.Planes, this.Transformation);

    }

    ApplyPlaneColors()
    {
        if (this.PlaneColors != null && this.PlaneColors.length > 0)
        {
            let planes = this.Planes;

            this.PlaneColors.forEach((plColor: PlaneColor,i: number)=>{

                let pColor: Color = plColor.Color;

                if (plColor.Range != null)
                {
                    for (var cnt=plColor.Range.from; cnt<= plColor.Range.to; cnt++)
                    {
                        planes[cnt].Color = pColor;
                    }
                }
                else
                {
                    plColor.Planes.forEach((plIdx: number) =>
                    {
                        planes[plIdx].Color = pColor;
                    });
                }
            });
        }
        let planes = this.Planes;

        if (this.HiddenRanges != null && this.HiddenRanges.length > 0)
        {
            this.HiddenRanges.forEach((range: NumRange) =>
            {
                for (var cnt=range.from; cnt <= range.to; cnt++ )
                {
                    planes[cnt].ShouldHide = true;
                }
            });
        }

        if (this.VisibleRanges != null && this.VisibleRanges.length > 0)
        {
            for (var cnt=0; cnt < planes.length; cnt++ )
            {
                planes[cnt].ShouldHide = true;
            }

            this.VisibleRanges.forEach(function(range: NumRange)
            {
                for (var cnt = range.from; cnt <= range.to; cnt++ )
                {
                    planes[cnt].ShouldHide = false;
                }
            });
        }
    }

}