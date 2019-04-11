import { Transformation } from './transformation';
import { RepeatHint } from './RepeatHint';
import { GxUtils } from './gxUtils';
import { Plane } from './plane';
import { IShape } from './IShape';
import { Point } from './point';

export class ShapeAggregator
{
    Include: string;
    ParentId: string;
    Id: string;
    Name: string;
    Transformation: Transformation;
    ShapeIds: string[]  = new Array();
    ShapeRepeatHints: RepeatHint[];
    AggregateRepeatHints: RepeatHint[];
    ShapeRepeatTransformationHint: RepeatHint;
    AggregateRepeatTransformationHint: RepeatHint;
    ApplyAfterTransformation: boolean = false;
    constructor(transformation: Transformation)
    {
        this.Transformation = transformation;
        this.Id = GxUtils.NewGuid();
    }

    Planes: Plane[]  = new Array();
    AddShape(shape: IShape): void
    {
        if (this.ShapeRepeatHints != null )
        {
            //throw new Error("Aggregator " + this.Name + " already has a shape associated with Repeat Hints. Please define a separate Shape Aggregator.");
        }
        else
        {
            this.ShapeIds[this.ShapeIds.length] = shape.Id;
            shape.SetPlanes();
            let hiddenPlanes = shape.HiddenPlanes;
            let planes = this.Planes;

            shape.Planes.forEach(function(pl,idx)
            {

                if (hiddenPlanes != null && hiddenPlanes.length > 0 && hiddenPlanes.indexOf(idx) > -1)
                {
                    pl.ShouldHide = true;
                }
            });
            if (shape.Transformation != null && shape.Transformation.Rotation != null)
            {
                this.Planes = this.Planes.concat(shape.TransformedPlanes());

            }
            else
            {
                this.Planes = this.Planes.concat(shape.Planes);

            }
        }

    };

    AddShapeWithRepeatTransformationHint(shape: IShape, repeatHint: RepeatHint): void
    {
        //if (this.ShapeIds.length > 0)
        {
            //throw new Error("Aggregator " + this.Name + " already has a shape associated. Please define a separate Shape Aggregator.");

        } 
        //else
        {

            shape.SetPlanes();
            let planes: Plane[] = new Array();  

            if (shape.Transformation != null)
            {
                planes = shape.TransformedPlanes();
            }
            else
            {
                planes = shape.Planes;
            }

            this.Planes = this.Planes.concat(planes);

            for (let repeatCnt=0; repeatCnt < repeatHint.RepeatTimes-1; repeatCnt++)
            {

                    let txedPlanes: Plane[] = GxUtils.ApplyRepeatTransform(planes, repeatHint.Transformation, 
                                            this.Transformation == null ? new Point(0,0,0) : this.Transformation.Translation);

                this.Planes = this.Planes.concat(txedPlanes);

                planes = txedPlanes;

            }
        }
    }

    AddShapeWithRepeatHints(shape: IShape, repeatHints: RepeatHint[]): void
    {
        //if (this.ShapeIds.length > 0)
        {
            //throw new Error("Aggregator " + this.Name + " already has a shape associated. Please define a separate Shape Aggregator.");

        } 
        //else
        {
            let xRepeatHint: RepeatHint = new RepeatHint();
            let yRepeatHint: RepeatHint = new RepeatHint();
            let zRepeatHint: RepeatHint = new RepeatHint();

            repeatHints.forEach( (hint)=>{

                switch(hint.Axis)
                {
                    case "X":
                    xRepeatHint = hint;
                    break;
                    case "Y":
                    yRepeatHint = hint;
                    break;
                    case "Z":
                    zRepeatHint = hint;
                    break;

                }

              });

              for (let xRepeater=0; xRepeater < xRepeatHint.RepeatTimes; xRepeater++)
              {
                for (let yRepeater=0; yRepeater < yRepeatHint.RepeatTimes; yRepeater++)
                {
                    for (let zRepeater=0; zRepeater < zRepeatHint.RepeatTimes; zRepeater++)
                    {
                        let repeatShape :IShape = shape.Clone();

                        let x = shape.Transformation.Translation.x +  (xRepeater * xRepeatHint.SpaceDistance);
                        let y = shape.Transformation.Translation.y +  (yRepeater * yRepeatHint.SpaceDistance);
                        let z = shape.Transformation.Translation.z +  (zRepeater * zRepeatHint.SpaceDistance);

                        repeatShape.Transformation = new Transformation(new Point(x,y,z),shape.Transformation.Rotation,shape.Transformation.Skewness,shape.Transformation.Zoom);

                        repeatShape.SetPlanes();

                        if (repeatShape.Transformation != null && repeatShape.Transformation.Rotation != null)
                        {
                            this.Planes = this.Planes.concat(repeatShape.TransformedPlanes());

                        }
                        else
                        {
                            this.Planes = this.Planes.concat(repeatShape.Planes);

                        }

                    }
                }    
              }

        }

    }

    AddPlanes(planes:Plane[]): void 
    {

        this.Planes = this.Planes.concat(planes);
    }

    TransformedPlanes(): Plane[]
    {


        if (this.Include != null)
        {
            let planes: Plane[] = GxUtils.Copy(this.Planes);
            this.Planes = new Array();

            if (this.Transformation.Translation != null)
            {
                planes = GxUtils.Translate(planes, this.Transformation.Translation);
            }

            if (this.Transformation.Zoom!= null)
            {
                planes = GxUtils.Zoom(planes, this.Transformation.Zoom);

            }

            if (this.Transformation.Rotation!= null)
            {
                planes = GxUtils.RotatePlanes(planes, this.Transformation.Rotation);

            }


            if (this.ShapeRepeatHints != null && this.ShapeRepeatHints.length > 0)
            {
                let txedPlanes: Plane[] = GxUtils.ApplyRepeatHints(planes, this.ShapeRepeatHints);
                this.Planes = this.Planes.concat(txedPlanes);
            }
            else
            {
                this.Planes = this.Planes.concat(planes);

                let repeatHint = this.ShapeRepeatTransformationHint;

                if (repeatHint != null)
                {
                    for (let repeatCnt=0; repeatCnt < repeatHint.RepeatTimes-1; repeatCnt++)
                    {

                        let txedPlanes: Plane[] = GxUtils.ApplyRepeatTransform(planes, repeatHint.Transformation, new Point(0,0,0));

                        this.Planes = this.Planes.concat(txedPlanes);

                        planes = txedPlanes;
                    }
                }

            }

            return this.Planes;
        }
        else
        {
            if (this.Transformation.Translation != null && this.ApplyAfterTransformation!= null && this.ApplyAfterTransformation)
            {
                this.Planes = GxUtils.Translate(this.Planes, this.Transformation.Translation);
            }

            return GxUtils.TransformPlanes(this.Planes, this.Transformation);
        }
    }
}