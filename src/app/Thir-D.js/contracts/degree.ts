export class Degree
{
    Value: number;

    constructor(d: number)
    {
        this.Value = d;
    }

    Radian()
    {
        return (this.Value * Math.PI/180);
    }
}