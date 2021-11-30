var conn = require('../../../utils/dao');
var ObjectID= require('mongodb').ObjectId; 
var _db; 

class Notes{
    notescoll=null; 
    constructor(){
        this.initModel();
    }

    async initModel(){
        try {
            _db=await conn.getDB();
            this.notescoll=await _db.collection("notes");

        } catch (ex) {
            console.log(ex);
            process.exit(1);
        }
    }

    async addNote(noteTitle, noteContent,id){
        let newNote={
            noteTitle=noteTitle,
            noteContent=noteContent,
            user_id: new ObjectID(id)
        }
        let result = await this.notescoll.insertOne(newNote);
        return result;
    }
}
