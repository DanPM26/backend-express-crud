const express = require('express')
const router = express.Router();


// router.get('/', (req,res)=>{
//     res.send("Libros")
// })

 const libros = []

 router.get('/', (req,res)=>{
 res.json(libros)
 })

 router.post('/', (req,res)=>{
     const {autor,editorial,año} = req.body;
     if(autor && editorial && año){
         const id = libros.length + 1;
         const newTitle = {...req.body, id};
         console.log(newTitle)
         res.json("Petición recibida")
         libros.push(newTitle)
        
     } else {
       res.send("Error en almacenar la petición")
     }
 })

module.exports = router