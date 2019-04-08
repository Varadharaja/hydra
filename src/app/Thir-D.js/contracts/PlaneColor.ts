import { Color } from './color';
import { NumRange } from './range';

export class PlaneColor
{
    Color: Color;
    Planes: number[];
    Range: NumRange;
}

export class PlaneColors
{
    static Import(plColors: any): PlaneColor[]
    {
        let outputColors = new Array();
        if (plColors != null && plColors.length > 0)
        {
            plColors.forEach(function(e: any,i: number){
                let plColor = new PlaneColor();
                plColor.Color = Color.Import(e.Color);
                plColor.Planes = e.Planes;

                if (e.Range != null)
                {
                    plColor.Range = NumRange.Import(e.Range);
                }
                outputColors.push(plColor);
            })
        }

        return outputColors;
    }
}