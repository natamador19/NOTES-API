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
        return res.status(500).json({msg:"Error al procesar petición"});
    }
});



  router.put('/update/:id',async(req,res,next)=>{
    try {
        const {id}=req.params;
        const {noteTitle,noteContent}=req.body;
        const result = await Notes.updateNote(noteTitle,noteContent,id);
        console.log(result);
        return res.status(200).json({"msg":"Nota Actualizada"});
    } catch (ex) {
        console.log(ex);
        return res.status(500).json({msg:"Error al procesar petición"});
    }
  });

  router.get('/notebyid/:id',async(req,res,next)=>{
    try {
        const {id}=req.params;
        const result=await Notes.getById(id);
        console.log(result);
        return res.status(200).json(result);
    } catch (ex) {
        console.log(x);
        return res.status(500).json({msg:"Error al procesar petición"});
        
    }
  });

  router.get('/facet/:page/:items',async (req,res,next)=>{
    try {
      let {page,items}=req.params;
      page=parseInt(page)||1;
      items=parseInt(items)||10;
      const notes=await Notes.getByFacet('',page,items,req.user._id);
      return res.status(200).json(notes);
      
    } catch (ex) {
      console.log(x);
      return res.status(500).json({msg:"Error al procesar petición"});
      
    }
  });


 
  


module.exports=router;