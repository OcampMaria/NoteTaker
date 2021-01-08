const { uuid } = require('uuidv4');

const { notStrictEqual } = require("assert");
const { response } = require("express");
const fs = require("fs");
const util = require("util");
const readFileasync = util.promisify(fs.readFile);




module.exports = function (app) {

  app.get("/api/notes", (req, res) => {
    readFileasync("./db/db.json", "utf8").then(data =>{
    res.send(data);
  })
  });

  
  app.post("/api/notes", (req, res) => {
    let myuuid = uuid();
    console.log('Your UUID is: ' + myuuid);

    readFileasync("./db/db.json", "utf8").then(data =>{
      const newNote = {
        title:req.body.title,
        text:req.body.text,
        id:myuuid,
      };

      var stringedData = JSON.parse(data)|| []
      console.log(stringedData, "parsed");
      stringedData.push(newNote)
      
      fs.writeFile("./db/db.json", JSON.stringify(stringedData), (err) => { 
        console.log(data, "stringed");
        if (err) 
        console.log(err, "error"); 
        else { 
          console.log("File written successfully\n");  
        } 
      });

      // need to send data back to the cliecnt
      res.send(stringedData);
    })
        
  });

  //geting Notes
  // app.get("/api/notes/:id", (req,res)=> {
  //   res.send(notes[req.params.id]);
  // })
   
  app.delete("/api/notes/:id", function(req,res){
    // receive query parameter containing the id of a note to delete
    //readl all noted from db.jsonfile, remove the note with given id and rewrite the notes to the db.json
    readFileasync("./db/db.json", "utf8").then(data =>{
      var stringedData = JSON.parse(data)
      stringedData.forEach(notes => {
        console.log(notes.id, "notes.id");
      });

      const deleted = stringedData.find(noteId =>noteId.id === req.params.id);

      const idDel = stringedData.indexOf(deleted);
      stringedData.splice(idDel, 1);

      fs.writeFile("./db/db.json", JSON.stringify(stringedData), (err, data) => { 
        if (err) throw err;
        res.json(stringedData);
        
      });  
    })


  })
}
