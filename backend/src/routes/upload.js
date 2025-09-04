const express = require('express')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const path = require('path')
const fs = require('fs')


const upload = multer({ dest: path.join(__dirname, '../../uploads') })
const router = express.Router()


// in-memory job store (for demo). Replace with Redis/Postgres in prod.
const jobs = {}


router.post('/upload', upload.array('files[]'), async (req, res)=>{
const jobId = 'job-'+Date.now()
const personaYears = req.body.personaYears || '15'
jobs[jobId] = { status: 'queued', createdAt: new Date().toISOString() }


// store file paths so worker can pick them up
const files = req.files.map(f=> ({ originalname: f.originalname, path: f.path }))
const payload = { jobId, files, personaYears }


// write a small job file the worker reads
const jobsDir = path.join(__dirname, '../../jobs')
if(!fs.existsSync(jobsDir)) fs.mkdirSync(jobsDir)
fs.writeFileSync(path.join(jobsDir, jobId+'.json'), JSON.stringify(payload))


// update job to processing for demo
jobs[jobId].status = 'processing'


res.json({ jobId })
})


router.get('/status/:jobId', (req,res)=>{
const j = jobs[req.params.jobId] || { status: 'not_found' }
res.json({ status: j.status })
})


router.get('/result/:jobId', (req,res)=>{
const resultsDir = path.join(__dirname, '../../results')
const f = path.join(resultsDir, req.params.jobId + '.json')
if(fs.existsSync(f)){
const data = JSON.parse(fs.readFileSync(f))
return res.json(data)
}
return res.status(404).json({ error: 'result not ready' })
})


module.exports = router