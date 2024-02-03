const express = require('express')
const router = express.Router();

 const libros = []
 
/**
 * @swagger
 * components:
 *  schemas:
 *    Order:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The order's unique identifier
 *        autor:
 *          type: string
 *          description: Nombre del autor
 *        editorial:
 *          type: string
 *          description: Nombre de la editorial
 *        año:
 *          type: number
 *          description: Año de la publicación
 *        total:
 *          type: number
 *          description: The order's total amount
 *      required:
 *        - id
 *        - nombre
 *        - editorial
 *        - año
 *      example:
 *        id: 1
 *        autor: "Raewyn Connel"
 *        editorial: "CIEG"
 *        año: 2015
 */

// a. Obtener pedido
/**
 * @swagger
 * /api:
 *  get:
 *    summary: Obtener todos los libros
 *    tags: [Orders]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Order'
 *    responses:
 *      201:
 *        description: Se obtuvieron todos los datos
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Order'
 */

 router.get('/', (req,res)=>{
 res.json(libros)
 })

 // b. Crear pedido
/**
 * @swagger
 * /api:
 *  post:
 *    summary: Añadir libros
 *    tags: [Orders]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Order'
 *    responses:
 *      201:
 *        description: Se accedieron correctamente los libros
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Order'
 */

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

  // b. Crear pedido
/**
 * @swagger
 * /api/{id}:
 *  put:
 *    summary: Editar libros
 *    tags: [Orders]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Order'
 *    responses:
 *      201:
 *        description: Se accedieron correctamente los libros
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Order'
 */

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
 
  // b. Crear pedido
/**
 * @swagger
 * /api/{id}:
 *  delete:
 *    summary: Borrar libros especificos
 *    tags: [Orders]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Order'
 *    responses:
 *      201:
 *        description: Se borró correctamente el libro
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Order'
 */
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