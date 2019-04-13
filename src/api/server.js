const http = require('http');
var url = require('url');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {



  res.statusCode = 200;

  var fs = require('fs'),
    path = require('path'),    
    filePath = path.join("json/goals/", 'thirdjsGoals.json');

    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
          
          var url_parts = url.parse(req.url, true);
          var query = url_parts.query;
          
          
            res.writeHead(200, {'Content-Type': 'application/json'});

            let goalTree = JSON.parse(data);
            let goalId = query.goalId;
            let childGoals = goalTree.Goals.filter(goal=> goal.Prerequisites!= null && goal.Prerequisites.indexOf(goalId) > -1);

            res.write(JSON.stringify(childGoals));
            res.end();
        } else {
            console.log(err);
        }
    });


  //res.setHeader('Content-Type', 'text/plain');
  //res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});