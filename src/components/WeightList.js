import { useState } from "react";

function WeightList(){

const [page,setPage] = useState(1)
const [editIndex,setEditIndex] = useState(null)
const [editWeight,setEditWeight] = useState("")

const [startDate,setStartDate] = useState("")
const [endDate,setEndDate] = useState("")
const [weightLoss,setWeightLoss] = useState(null)

let weights = JSON.parse(localStorage.getItem("weights")) || []

const itemsPerPage = 5

const lastIndex = page * itemsPerPage
const firstIndex = lastIndex - itemsPerPage

const currentItems = weights.slice(firstIndex,lastIndex)

const totalPages = Math.ceil(weights.length/itemsPerPage)


// DELETE
const deleteWeight=(index)=>{

weights.splice(index,1)

localStorage.setItem("weights",JSON.stringify(weights))

window.location.reload()

}


// EDIT BUTTON CLICK
const startEdit=(index,weight)=>{

setEditIndex(index)
setEditWeight(weight)

}


// SAVE EDIT
const saveEdit=(index)=>{

weights[index].weight = editWeight

localStorage.setItem("weights",JSON.stringify(weights))

setEditIndex(null)

}


// FIND WEIGHT LOSS
const calculateLoss=()=>{

let filtered = weights.filter(w=>{

let d = new Date(w.date)

return d >= new Date(startDate) && d <= new Date(endDate)

})

if(filtered.length >= 2){

let first = parseFloat(filtered[0].weight)

let last = parseFloat(filtered[filtered.length-1].weight)

setWeightLoss(first-last)

}else{

setWeightLoss("Not enough data")

}

}


return(

<div>

<h3>Weight List</h3>

<table>

<thead>
<tr>
<th>Weight</th>
<th>Date</th>
<th>Time</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{currentItems.map((w,i)=>{

let realIndex = firstIndex + i

return(

<tr key={i}>

<td>

{editIndex === realIndex ?

<input
value={editWeight}
onChange={(e)=>setEditWeight(e.target.value)}
/>

:

w.weight

}

</td>

<td>{w.date}</td>

<td>{w.time}</td>

<td>

{editIndex === realIndex ?

<button onClick={()=>saveEdit(realIndex)}>Save</button>

:

<button onClick={()=>startEdit(realIndex,w.weight)}>Edit</button>

}

<button onClick={()=>deleteWeight(realIndex)}>Delete</button>

</td>

</tr>

)

})}

</tbody>

</table>


{/* Pagination */}

<div style={{marginTop:"15px"}}>

{Array.from({length:totalPages},(_,i)=>(

<button key={i} onClick={()=>setPage(i+1)}>

{i+1}

</button>

))}

</div>


{/* Weight Loss Between Dates */}

<h3 style={{marginTop:"30px"}}>Find Weight Loss</h3>

<input
type="date"
onChange={(e)=>setStartDate(e.target.value)}
/>

<input
type="date"
onChange={(e)=>setEndDate(e.target.value)}
/>

<button onClick={calculateLoss}>

Calculate

</button>


{weightLoss !== null &&

<p>

Weight Difference: {weightLoss}

</p>

}

</div>

)

}

export default WeightList