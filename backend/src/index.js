const express = require('express')
const cors = require('cors')
const uploadRoutes = require('./routes/upload')


const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', uploadRoutes)


app.listen(3000, ()=> console.log('Backend listening on 3000'))