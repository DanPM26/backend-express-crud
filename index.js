const express = require('express');
const cors = require('cors')
const app = express()

const PORT = 5000
app.use(cors())
app.use(express.json())
const {librosRouter} = require('./routes')

app.use('/api', librosRouter)

app.get('/', (req,res)=>{
    res.send("Hola mundo")
})

app.listen(PORT, ()=>{
console.log(`Servidor contectado en puerto ${PORT}`)
})
