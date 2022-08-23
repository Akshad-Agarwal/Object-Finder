video = "";
Status = "";
objects = [];

function preload() {

}

function setup() {
    canvas = createCanvas(400, 300);
    canvas.position(565,350);
    video = createCapture(VIDEO);
    video.hide();
    video.size(600,500);
}

function draw() {
    image(video, 0, 0, 400, 400);
    if (Status != "") {
        ObjectDetect.detect(video, gotresults);
        for (var i = 0; i < objects.length; i++) {
            stroke("purple");
            text(objects[i].label + " " + Math.floor(objects[i].confidence *100) + " % ", objects[i].x + 10 , objects[i].y + 10);
            document.getElementById("status").innerHTML = "Status: Object Detecteds"
            noFill();
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);

            if(objects[i].label == input_text){
                object_Detector.detect(gotresults);
                document.getElementById("Object_Found").innerHTML = "Object Found: " + "Yes";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input_text + "Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("Object_Found").innerHTML = input_text + " Not Found";
            }
        }
    }
}

function gotresults(error, results) {
    if (error) {
        console.log(error);
    }

    else {
        console.log(results);
        objects = results;
    }
}

function start() {
    ObjectDetect = ml5.objectDetector("cocossd", modelReady);
    document.getElementById("status").innerHTML = "status: detecting objects";
    input_text = document.getElementById("input_text").value;
}

function modelReady() {
    console.log("modelLoaded");
    Status = true;
}