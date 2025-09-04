const fs = require('fs')
const path = require('path')


// This worker is intentionally simple for demo. In prod replace:
// - OCR calls (AWS Textract / Tesseract)
// - LLM calls (OpenAI / Anthropic)
// - Use a queue (Redis/Bull) instead of filesystem polling


const jobsDir = path.join(__dirname, '../../jobs')
const resultsDir = path.join(__dirname, '../../results')
if(!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir)


console.log('Worker started. Polling jobs directory...')
setInterval(()=>{
const files = fs.existsSync(jobsDir) ? fs.readdirSync(jobsDir) : []
files.forEach(file => {
if(!file.endsWith('.json')) return
const job = JSON.parse(fs.readFileSync(path.join(jobsDir, file)))
console.log('Processing', job.jobId)


// Simulate extraction
const extractedText = []
job.files.forEach(f=>{
extractedText.push(`Extracted text from ${f.originalname}`)
})


// Simulate LLM-generated testcases
const testcases = [
{
id: 'TC-001',
title: 'Sample test - verify upload',
preconditions: ['App is running'],
steps: ['Open app','Upload file','Click generate'],
testData: { filename: job.files[0]?.originalname || 'sample.pdf' },
expected: 'Generated testcases appear in table',
priority: 'P0',
severity: 'Critical'
}
]


const resultPayload = { jobId: job.jobId, status: 'completed', testcases }
fs.writeFileSync(path.join(resultsDir, job.jobId + '.json'), JSON.stringify(resultPayload, null, 2))


// remove job file
fs.unlinkSync(path.join(jobsDir, file))
})
}, 3000)