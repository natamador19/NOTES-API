var express= require('express');
var router= express.Router();
var NotesDao= require('./notes.dao');
var Notes= new NotesDao();


router.get('/all', async (req, res, next)=>{
    try{
      const allNoteEntries = await Notes.getAll(req.user._id);
      return res.status(200).json(allNoteEntries);
    }catch(ex){
      console.log(ex);
      return res.status(500).json({msg:"Error al procesar petición"});
    }
  });

router.post('/newNote', async (req,res,next)=>{
    try {
        const {noteTitle,noteContent}=req.body;
        const result = await Notes.addNew(noteTitle,noteContent,req.user._id);
        console.log(result);
        res.status(200).json({msg:"Nota Agregada!"});
    } catch (ex) {
        console.log(ex);
    }
});

router.delete('/delete/:id', async (req, res, next)=>{
    try {
      const {id} = req.params;
      const result = await Notes.deleteById(id, req.user._id);
      console.log(result);
      return res.status(200).json({"msg":"Eliminado OK"});
    } catch (ex) {
      console.log(ex);
      return res.status(500).json({ msg: "Error al procesar petición" });
    }
  }); 
  


module.exports=router;