import express from 'express'
import Job from '../models/Job.js'

const router = express.Router()

router.get('/test', (req, res) => {
  res.send('deu certo')
})

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