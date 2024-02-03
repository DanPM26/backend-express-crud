const express = require('express');
const cors = require('cors');
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const path = require("path")
require('dotenv').config()
const app = express()
const {librosRouter} = require('./routes')

const PORT = 5000

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node API for Order Management',
            version: '1.0.0',
        },
        servers: [
            {
                url: PORT,
            },
        ],
    },
    // Ruta de los archivos donde se buscarán los comentarios para generar la documentación
    apis: [`${path.join(__dirname, './routes/*.js')}`],
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)

app.use(cors())
app.use(express.json())


console.log(process.env.VERCEL_FORCE_NO_BUILD_CACHE)

app.use('/api', librosRouter)
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.get('/', (req,res)=>{
    res.send("Hola mundo")
})

app.listen(PORT, ()=>{
console.log(`Servidor contectado en puerto ${PORT}`)
})
