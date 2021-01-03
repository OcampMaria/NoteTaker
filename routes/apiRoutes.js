const { notStrictEqual } = require("assert");
const fs = require("fs");
const util = require("util");
const readFileasync = util.promisify(fs.readFile);


module.exports = function (app) {

    app.get("/api/notes", function(req, res) {
        readFileasync("./db/db.json", "utf8").then(data =>{
        res.send(data);
        console.log(data);
    })
    });

    app.post("/api/notes", function(req, res) {
        readFileasync("./db/db.json", "utf8").then(data =>{
            console.log(data, "push");

            const newNote = {
                title:req.body.title,
                text:req.body.name
            };
            res.json(newNote)
            data.push(newNote);
            res.send(newNote);
        })
        
    });
   
    app.delete("/api/notes/:id", function(req,res){

    })
};
