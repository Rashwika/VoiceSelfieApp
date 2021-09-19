Webcam.set({
    width: 360,
    height: 250,
    image_format: 'png',
    png_quality: 90
});
var recognition = new window.webkitSpeechRecognition();

function listen() {
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}
recognition.onresult = function run(event) {
    console.log(event);
    content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML = content;
    if (content == "take my selfie") {
        text_to_speech();
        Webcam.attach("#camera");
        // another way cam = document.getElementById("camera");
        // Webcam.attach(cam);
    }
    else{
        window.alert("Sorry, I can't recognize what you said!")
        document.getElementById("textbox").innerHTML = "Say 'take my selfie' if you want to take a selfie";
    }

}

function text_to_speech() {
    speak_data = "Taking your selfie in 5 seconds";
    speak_audio = new SpeechSynthesisUtterance(speak_data);
    synthesis = window.speechSynthesis;
    synthesis.speak(speak_audio);
    setTimeout(function(){
        take_my_pic();
        save();
    },5000);
}

function take_my_pic() {
    Webcam.snap(function (cam_pic) {
        document.getElementById("result").innerHTML = '<img id="selfie_pic" src="' + cam_pic + '">';
    });
}

function save() {
    img = document.getElementById("selfie_pic").src;
    document.getElementById("link").href = img;
    document.getElementById("link").click();
}
div = document.getElementById("camera");
div.addEventListener("mousedown",mouse_down);
function mouse_down(){
    Webcam.attach("#camera");
    take_my_pic();
    save();
}