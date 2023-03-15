const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express()

const PORT = 5000
app.use(cors())
app.use(express.json())
const {librosRouter} = require('./routes')

console.log(process.env.VERCEL_FORCE_NO_BUILD_CACHE)
app.use('/api', librosRouter)

app.get('/', (req,res)=>{
    res.send("Hola mundo")
})

app.listen(PORT, ()=>{
console.log(`Servidor contectado en puerto ${PORT}`)
})
