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

    async updateNote(noteT,noteC,id){
        const filter={"_id": new ObjectID(id)};
        const update={"$set":{noteTitle:noteT,noteContent:noteC}};
        let result= await this.notescoll.updateOne(filter,update);
        return result;
    }

    async deleteById(id) {
        let filter = { "_id": new ObjectID(id) };
        let result = await this.notescoll.deleteOne(filter);
        return result;
      }
    async getById(id){
        let filter={"_id": new ObjectID(id)};
        let result= await this.notescoll.findOne(filter);
        return result;
    }

    async getByFacet(textToSearch,page,itemsPerPage,userId){
        const filter={noteContent:RegExp(textToSearch,'g'),"user_id": new ObjectID(userId)};
        let cursor=await this.notescoll.find(filter);
        let docsMatched=await cursor.count();
        cursor.sort({noteTitle:1});
        cursor.skip((itemsPerPage*(page-1)));
        cursor.limit(itemsPerPage);

        let documents = await cursor.toArray();
        return{
            docsMatched,
            documents,
            page,
            itemsPerPage
        }
    }



}

module.exports = Notes;