import { Project } from './project';
import { Point } from './point';

export class Studio
{

    Project: Project;

    AddProject: () => void;
    LoadProject:() => void;
    AddShape: () => void;
    AggregateShapes: () => void;
    SelectShape: () => void;
    DeleteShape: () => void;
    DeleteAggregateShapes: () => void;
    CameraPosition: Point;

}