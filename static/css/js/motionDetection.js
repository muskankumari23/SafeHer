let shake_detected = 0
let fall_detected = 0
let running_detected = 0

window.addEventListener("devicemotion",function(e){

let x = e.acceleration.x
let y = e.acceleration.y
let z = e.acceleration.z

let total = Math.abs(x+y+z)

if(total > 25){

shake_detected = 1

}

})