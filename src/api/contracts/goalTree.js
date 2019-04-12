export class GoalTree
{
    // Name of the goal Tree
    Name;
    // Goals
    Goals = new Array()

    constructor(Name)
    {
        var fs = require('fs'),
        path = require('path'),    
        filePath = path.join(__dirname, 'start.html');

        fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
            if (!err) {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(data);
                response.end();
            } else {
                console.log(err);
            }
        });

    }

    AddGoal(goal)
    {
        if (typeof(goal) != 'Goal')
        {
            throw new error("Invalid structure");
        }

    }

}