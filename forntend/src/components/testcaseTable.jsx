import React from 'react'


export default function TestcaseTable({ results }){
return (
<div>
<h2 className="text-xl font-semibold">Generated Test Cases</h2>
<div className="overflow-auto mt-3">
<table className="min-w-full border">
<thead className="bg-gray-100">
<tr>
<th>ID</th><th>Title</th><th>Steps</th><th>Test Data</th><th>Expected</th><th>Priority</th><th>Severity</th>
</tr>
</thead>
<tbody>
{results.testcases.map(tc=> (
<tr key={tc.id}>
<td>{tc.id}</td>
<td>{tc.title}</td>
<td><pre className="whitespace-pre-wrap">{tc.steps.join('\n')}</pre></td>
<td><pre className="whitespace-pre-wrap">{JSON.stringify(tc.testData, null, 2)}</pre></td>
<td>{tc.expected}</td>
<td>{tc.priority}</td>
<td>{tc.severity}</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
)
}