export class Goal
{
    // Unique Identifier
    Id: string;

    // Goal Name
    Name: string;

    // Brief description 
    Description: string;

    // Pattern Matches
    nGrams: string[] = new Array();

    // Prequisite Goal Id-s for the given goal
    Prerequisites: string[] = new Array();

    // Goal Accomplished or not?
    Accomplished: boolean = false;

    // Define an actionable Hint for this current goal 
    ActionHint: string;

    // Post Process
    PostProcess: string;

}