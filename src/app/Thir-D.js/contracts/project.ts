import { IShape } from './IShape';
import { ShapeAggregator } from './ShapeAggregator';

export class Project
{
    Name: string;
    Shapes: IShape[];
    Aggregators: ShapeAggregator[];

}