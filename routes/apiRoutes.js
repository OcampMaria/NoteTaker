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
                text:req.body.text
            };

            var stringedData = JSON.parse(data)
            console.log(stringedData);
            stringedData.push(newNote)
            console.log(stringedData, "stringData")
           

            fs.writeFile("db.json", data, (err) => { 
                if (err) 
                  console.log(err); 
                else { 
                  console.log("File written successfully\n"); 
                  console.log(fs.readFileSync("db.json", "utf8")); 
                } 
              });
          
          
        })
        
    });
   
    app.delete("/api/notes/:id", function(req,res){

    })
};
