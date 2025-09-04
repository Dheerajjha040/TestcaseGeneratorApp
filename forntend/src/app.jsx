import React, { useState } from 'react'
import TestcaseTable from '../components/TestcaseTable'


export default function App(){
const [jobId, setJobId] = useState(null)
const [status, setStatus] = useState(null)
const [results, setResults] = useState(null)
const [files, setFiles] = useState([])


const upload = async (e)=>{
e.preventDefault()
const fd = new FormData()
for(const f of files) fd.append('files[]', f)
fd.append('personaYears', '15')
const res = await fetch('http://localhost:3000/api/upload', { method:'POST', body: fd })
const j = await res.json()
setJobId(j.jobId)
setStatus('queued')
}


const check = async ()=>{
if(!jobId) return
const r = await fetch(`http://localhost:3000/api/status/${jobId}`)
const j = await r.json()
setStatus(j.status)
if(j.status === 'completed'){
const rr = await fetch(`http://localhost:3000/api/result/${jobId}`)
const data = await rr.json()
setResults(data)
}
}


return (
<div className="p-6">
<h1 className="text-2xl font-bold mb-4">TestCase Generator</h1>
<form onSubmit={upload} className="mb-4">
<input type="file" multiple onChange={e=>setFiles(Array.from(e.target.files))} />
<div className="mt-2">
<button className="px-4 py-2 rounded bg-blue-600 text-white">Upload & Generate</button>
</div>
</form>
<div className="mb-4">
<button onClick={check} className="mr-2">Check Status</button>
<span>Status: {status}</span>
</div>
{results && <TestcaseTable results={results} />}
</div>
)
}