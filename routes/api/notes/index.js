var express= require('express');
var router= express.Router();
var NotesDao= require('./notes.dao');
var Notes= new NotesDao();

router.post('/newNote',async (req,res,next)=>{
    try {
        const {noteTitle,noteContent}=req.body;
        const result = await Notes.addNew(noteTitle,noteContent,req.user._id);
        console.log(result);
        res.status(200).json({msg:"Nota Agregada!"});
    } catch (ex) {
        console.log(ex);
    }
});


module.exports=router;