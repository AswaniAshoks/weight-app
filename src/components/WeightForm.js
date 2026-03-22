import { useState } from "react"

function WeightForm({ refreshData }) {

const [weight, setWeight] = useState("")

const addWeight = () => {

if (!weight) {
alert("Enter weight")
return
}

let data = JSON.parse(localStorage.getItem("weights")) || []

let now = new Date()

// ✅ dd/mm/yyyy
let day = String(now.getDate()).padStart(2, "0")
let month = String(now.getMonth() + 1).padStart(2, "0")
let year = now.getFullYear()

let date = `${day}/${month}/${year}`

// one entry per day
let exists = data.find(item => item.date === date)

if (exists) {
alert("Already added today")
return
}

let time = now.toLocaleTimeString()

data.push({
weight,
date,
time
})

localStorage.setItem("weights", JSON.stringify(data))

setWeight("")
refreshData()

}

return(
<div style={{marginBottom:"20px"}}>

<h3>Add Weight</h3>

<input
type="number"
value={weight}
onChange={(e)=>setWeight(e.target.value)}
placeholder="Enter weight"
/>

<button onClick={addWeight}>Add</button>

</div>
)

}

export default WeightForm