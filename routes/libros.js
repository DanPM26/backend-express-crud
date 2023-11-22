const express = require('express')
const router = express.Router();

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

 // Ruta PUT

 router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { autor, editorial, año } = req.body;
  const libro = libros.find((l) => l.id === id);
  console.log("Libro",libro)
  
  if (!libro) {
    // El libro no existe
    res.send("Error al actualizar el libro");
  } else {
    // El libro existe
    libro.autor = autor;
    libro.editorial = editorial;
    libro.año = año;
    console.log(libro);
    res.json("Petición recibida");
  }
  
 });
 
 // Ruta DELETE
 
 router.delete('/:id', (req, res) => {
   const id = parseInt(req.params.id);
   const libro = libros.find((l) => l.id === id);
   if (libro) {
    //splice() cambia el contenido de un array eliminando elementos existentes y/o agregando nuevos elementos.
    //ndexOf() retorna el primer índice en el que se puede encontrar un elemento dado en el array, ó retorna -1 si el elemento no esta presente.
     libros.splice(libros.indexOf(libro), 1);
     res.json("Petición recibida");
   } else {
     res.send("Error al eliminar el libro");
   }
 });

module.exports = router