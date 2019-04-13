export class Goal
{
    // Unique Identifier
    Id;

    // Goal Name
    Name;
    
    // Brief description 
    Description;
    
    // Pattern Matches
    nGrams = new Array();

    // Prequisite Goal Id-s for the given goal
    Prerequisites = new Array();

    // Goal Accomplished or not?
    Accomplished = false;

    // Define an actionable Hint for this current goal 
    ActionHint;

    // Post Process 
    PostProcess;

    
}