import { useState } from "react"

function WeightForm(){

const [weight,setWeight]=useState("")

const addWeight=()=>{

let weights = JSON.parse(localStorage.getItem("weights")) || []

const today = new Date().toLocaleDateString()

const alreadyAdded = weights.find(
(w)=> w.date===today
)

if(alreadyAdded){
alert("You already added weight today")
return
}

const newWeight={
weight,
date:today,
time:new Date().toLocaleTimeString()
}

weights.push(newWeight)

localStorage.setItem("weights",JSON.stringify(weights))

window.location.reload()

}

return(

<div>

<h3>Add Weight</h3>

<input
placeholder="Enter Weight"
onChange={(e)=>setWeight(e.target.value)}
/>

<button onClick={addWeight}>
Add
</button>

</div>

)

}

export default WeightForm