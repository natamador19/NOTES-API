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

    async getAll(id){
        const filter = {"user_id": new ObjectID(id)}
        let notes = await this.notescoll.find(filter);
        return notes.toArray();
      }

    async addNew(noteTitle, noteContent,id){
        let newNote={
            noteTitle,
            noteContent,
            noteDate: new Date().getTime(),
            user_id: new ObjectID(id)
        }
        let result = await this.notescoll.insertOne(newNote);
        return result;
    }

    async deleteById(id) {
        let filter = { "_id": new ObjectID(id) };
        let result = await this.notescoll.deleteOne(filter);
        return result;
      }

}

module.exports = Notes;