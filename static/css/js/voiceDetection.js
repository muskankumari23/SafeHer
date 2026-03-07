let voice_detected = 0

const keywords = [
"help",
"save me",
"danger",
"please help",
"emergency"
]

const recognition = new webkitSpeechRecognition()

recognition.continuous = true

recognition.onresult = function(event){

let text = event.results[event.results.length-1][0].transcript

keywords.forEach(word =>{

if(text.includes(word)){

voice_detected = 1

}

})

}

recognition.start()