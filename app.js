import express from 'express'
import exphbs from 'express-handlebars'
import path from 'path'
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

// handle bars
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

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