import express from 'express'
import Job from '../models/Job.js'

const router = express.Router()

router.get('/test', (req, res) => {
  res.send('deu certo')
})

// detalhe da vaga
router.get('/view/:id', (req, res) => {
  Job.findOne({
    where: { id: req.params.id },
  }).then(job => {
    res.render('view', { job })
  }).catch(err => console.log(err))
})

// form da rota de envio
router.get('/add', (req, res) => {
  res.render('add')
})

// POST - adicionar job
router.post('/add', (req, res) => {
  const { title, description, salary, company, email, new_job } = req.body
  
  // Insert - inserindo dados no sistema
  Job.create({
    title,
    description,
    salary,
    company,
    email,
    new: new_job
  }).then(() => {
    res.redirect('/')
  }).catch(err => console.log(err))
})

export default router