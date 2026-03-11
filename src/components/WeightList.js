import { useState } from "react"

function WeightList(){

let weights = JSON.parse(localStorage.getItem("weights")) || []

const [page,setPage]=useState(1)

const itemsPerPage = 5

const start=(page-1)*itemsPerPage
const end=start+itemsPerPage

const currentItems = weights.slice(start,end)

const deleteWeight=(index)=>{

weights.splice(index,1)

localStorage.setItem("weights",JSON.stringify(weights))

window.location.reload()

}

return(

<div>

<h3>Weight List</h3>

<table border="1">

<tr>
<th>Weight</th>
<th>Date</th>
<th>Time</th>
<th>Action</th>
</tr>

{currentItems.map((w,i)=>(

<tr key={i}>

<td>{w.weight}</td>
<td>{w.date}</td>
<td>{w.time}</td>

<td>

<button onClick={()=>deleteWeight(i)}>
Delete
</button>

</td>

</tr>

))}

</table>

<button onClick={()=>setPage(page-1)}>
Prev
</button>

<button onClick={()=>setPage(page+1)}>
Next
</button>

</div>

)

}

export default WeightList