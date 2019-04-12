const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;

  var fs = require('fs'),
    path = require('path'),    
    filePath = path.join("json/goals/", 'thirdjsGoals.json');

    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(data);
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