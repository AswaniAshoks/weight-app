const [startDate,setStartDate]=useState("")
const [endDate,setEndDate]=useState("")
const [loss,setLoss]=useState(null)

const calculateLoss=()=>{

let filtered = weights.filter(
(w)=> w.date>=startDate && w.date<=endDate
)

if(filtered.length>=2){

let first = filtered[0].weight
let last = filtered[filtered.length-1].weight

setLoss(first-last)

}

}