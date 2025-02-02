import express from 'express'
import exphbs from 'express-handlebars'
import path from 'path'
import db from './db/connection.js'
import bodyParser from 'body-parser'
import jobsRoutes from './routes/jobs.js'
import Job from './models/Job.js'
import { Sequelize } from 'sequelize'

const app = express()
const PORT = 3000

const Op = Sequelize.Op

app.listen(PORT, () => {
  console.log(`O Express está rodando na porta ${PORT}`)
})

// body parser
app.use(bodyParser.urlencoded({ extended: false }))

// handle bars
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// static folder
app.use(express.static(path.join(__dirname, 'public')))

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
  let search = req.query.job
  let query = `%${search}%`

  if (!search) {
    Job.findAll({ 
      order: [ ['createdAt', 'DESC'] ]
    })
    .then(jobs => {
      res.render('index', { jobs })
    })
    .catch(err => console.log(err))
  } else {
    Job.findAll({
      where: { title: { [Op.like]: query } },
      order: [ ['createdAt', 'DESC'] ]
    })
    .then(jobs => {
      res.render('index', { jobs, search })
    })
    .catch(err => console.log(err))
  }
})

// Jobs Routes
app.use('/jobs', jobsRoutes)