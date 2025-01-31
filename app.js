import express from 'express'
import db from './db/connection.js'
import bodyParser from 'body-parser'
import jobsRoutes from './routes/jobs.js'

const app = express()
const PORT = 3000

app.listen(PORT, () => {
  console.log(`O Express está rodando na porta ${PORT}`)
})

// body parser
app.use(bodyParser.urlencoded({ extended: false }))

// DB Connection
db
  .authenticate()
  .then(() => {
    console.log('Conectou ao banco com sucesso')
  })
  .catch(err => {
    console.log('Ocorreu um erro ao conectar ', err)
  })

// Routes
app.get('/', (req, res) => {
  res.send('Está funcionando 3')
})

// Jobs Routes
app.use('/jobs', jobsRoutes)