var express = require('express');
var router = express.Router();
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');
var User = require('../config')

router.post('/register', async (req, res, next)=> {
 
  try{
    const saveData = req.body;
    let response = await User.add(saveData);
    res.status(200).send({message: "successfully updated"})

  }catch(e){
    res.status(500).send({message: e.toString()})
  }

});

router.get('/alldata', async (req,res)=> {

  try{

    const snapshot = await User.get();
    const data = snapshot.docs.map((doc)=> ({id: doc.id, ...doc.data()}))
    res.send(data)

  }catch(e){
    res.status(500).send({message: e.toString()})

  }

})

router.delete('/:id', async(req, res, next)=> {

  try{
    let id = req.params.id;
    const del = await User.doc(id).delete()
    res.status(200).send({message: "successfully removed " + id})
  }catch(e){
       res.status(500).send({message: e.toString()})

  }
})


module.exports = router;
