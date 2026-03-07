document.getElementById("sosBtn").onclick = triggerSOS

function triggerSOS(){

fetch("/sos",{

method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({

lat,
lng

})

})

}