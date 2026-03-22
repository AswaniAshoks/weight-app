import { useEffect, useState } from "react"

function WeightList({ refresh }) {

const [weights, setWeights] = useState([])
const [currentPage, setCurrentPage] = useState(1)
const itemsPerPage = 5

const [startDate, setStartDate] = useState("")
const [endDate, setEndDate] = useState("")
const [result, setResult] = useState("")

const [editingIndex, setEditingIndex] = useState(null)
const [editValue, setEditValue] = useState("")


// load data
useEffect(() => {
const data = JSON.parse(localStorage.getItem("weights")) || []
setWeights(data)
}, [refresh])


// update storage
const updateStorage = (data) => {
localStorage.setItem("weights", JSON.stringify(data))
setWeights(data)
}


// delete
const deleteWeight = (index) => {
let updated = [...weights]
updated.splice(index,1)
updateStorage(updated)
}


// edit
const startEdit = (index,value) => {
setEditingIndex(index)
setEditValue(value)
}

const saveEdit = (index) => {
let updated = [...weights]
updated[index].weight = editValue
updateStorage(updated)
setEditingIndex(null)
}


// date conversion
const toNumber = (dateStr) => {
let [d,m,y] = dateStr.split("/")
return Number(`${y}${m.padStart(2,"0")}${d.padStart(2,"0")}`)
}

const inputToNumber = (dateStr) => {
let [y,m,d] = dateStr.split("-")
return Number(`${y}${m}${d}`)
}


// calculate
const calculateLoss = () => {

if (!startDate || !endDate) {
setResult("Select both dates")
return
}

let startNum = inputToNumber(startDate)
let endNum = inputToNumber(endDate)

let filtered = weights.filter(w=>{
let num = toNumber(w.date)
return num >= startNum && num <= endNum
})

if (filtered.length === 0) {
setResult("No data in range")
return
}

filtered.sort((a,b)=> toNumber(a.date)-toNumber(b.date))

let first = Number(filtered[0].weight)
let last = Number(filtered[filtered.length-1].weight)

let diff = first - last

setResult(`Weight Difference: ${diff} kg`)
}


// reset
const resetDates = () => {
setStartDate("")
setEndDate("")
setResult("")
}


// pagination
const indexOfLast = currentPage * itemsPerPage
const indexOfFirst = indexOfLast - itemsPerPage
const currentItems = weights.slice(indexOfFirst,indexOfLast)

const totalPages = Math.ceil(weights.length/itemsPerPage)


return(
<div>

<h2>Weight List</h2>

<table border="1" width="100%">
<thead>
<tr>
<th>Weight</th>
<th>Date</th>
<th>Time</th>
<th>Action</th>
</tr>
</thead>

<tbody>
{currentItems.map((w,index)=>{

let actualIndex = indexOfFirst + index

return(
<tr key={index}>

<td>
{editingIndex===actualIndex ? (
<input
value={editValue}
onChange={(e)=>setEditValue(e.target.value)}
/>
) : w.weight}
</td>

<td>{w.date}</td>
<td>{w.time}</td>

<td>
{editingIndex===actualIndex ? (
<button onClick={()=>saveEdit(actualIndex)}>Save</button>
) : (
<button onClick={()=>startEdit(actualIndex,w.weight)}>Edit</button>
)}

<button onClick={()=>deleteWeight(actualIndex)}>Delete</button>
</td>

</tr>
)

})}
</tbody>
</table>


{/* pagination */}
<div>
{[...Array(totalPages)].map((_,i)=>(
<button key={i} onClick={()=>setCurrentPage(i+1)}>
{i+1}
</button>
))}
</div>


<h3>Find Weight Loss</h3>

<input
type="date"
value={startDate}
onChange={(e)=>{
setStartDate(e.target.value)
setResult("")
}}
/>

<input
type="date"
value={endDate}
onChange={(e)=>{
setEndDate(e.target.value)
setResult("")
}}
/>

<button onClick={calculateLoss}>Calculate</button>

<button onClick={resetDates}>Reset</button>

<p style={{fontWeight:"bold"}}>
{result}
</p>

</div>
)

}

export default WeightList