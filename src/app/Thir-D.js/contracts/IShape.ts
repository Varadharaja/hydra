import { Plane } from './plane';
import { Transformation } from './transformation';
import { Color } from './color';
import { PlaneColor } from './PlaneColor';
import { NumRange } from './range';
import { ShapeTypes } from './ShapeTypes';

export interface IShape
{
    Id: string;
    Name: string;
    Type: ShapeTypes;

    // Planes
    Planes: Plane[];

    // Transformation Effects
    Transformation: Transformation;
    Color: Color;
    // Copy of the Shape
    Clone: () => IShape;
    // Transform Operations
    Rotate: () => void;
    Move: () => void;
    Zoom: () => void;

    // Generate Planes & Apply Transforms (if any)
    SetPlanes: () => void;

    // Get Transformed planes
    TransformedPlanes: () => Plane[];


    ShouldHide: boolean;

    HiddenPlanes: number[];

    PlaneColors: PlaneColor[];

    HiddenRanges: NumRange[];

    VisibleRanges: NumRange[];
}