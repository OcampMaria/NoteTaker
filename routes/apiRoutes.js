const fs = require('fs');
const util = require('util');

const readFileasync = util.promisify(fs.readFile);

module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
    readFileasync("../Develop/db/db.json", "utf8").then(console.log(data))
    });

    app.post("/api/notes", function(req, res) {
       
    });

    app.delete("/api/notes/:id", function(req,res){

    })
};
