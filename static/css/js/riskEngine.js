setInterval(()=>{

let data = {

voice_detected,
shake_detected,
fall_detected,
running_detected,

loud_noise:0,
late_night:0,
unknown_location:0,

heart_rate:80,
stress_level:0

}

fetch("/predict_risk",{

method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(data)

})
.then(res=>res.json())
.then(res=>{

document.getElementById("riskLevel").innerText = res.risk

if(res.risk == 2){

triggerSOS()

}

})

},5000)