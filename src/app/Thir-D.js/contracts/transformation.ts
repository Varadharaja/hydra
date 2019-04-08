import { Angle } from './angle';
import { Point } from './point';
import { Scale } from './scale';

export class Transformation
{
    Translation: Point;
    Rotation: Angle;
    Skewness: Angle;
    Zoom: Scale;

    constructor(translate: Point, rotate: Angle, skew: Angle, zoom: Scale)
    {
        this.Translation = translate;
        this.Rotation = rotate;
        this.Skewness = skew;
        this.Zoom  = zoom;
    }

    static Import(txm: any ): Transformation
    {
        let angle = new Angle(0, 0, 0);
        let pt = new Point(0, 0, 0);
        let zoom = new Scale(1, 1, 1);
        let skew = new Angle(0, 0, 0);
        if (txm != null)
        {
            if (txm.Rotation != null)
            {
                angle = new Angle(txm.Rotation.alpha, txm.Rotation.beta, txm.Rotation.gamma);
            }

            if (txm.Translation != null)
            {
                pt = new Point(txm.Translation.x, txm.Translation.y, txm.Translation.z);

            }

            if (txm.Zoom != null)
            {
                zoom = new Scale(txm.Zoom.xScale, txm.Zoom.yScale, txm.Zoom.zScale);
            }
        }
        return new Transformation(pt, angle, skew, zoom);
    }
}