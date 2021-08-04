img = "";
status = "";
object = [];
objectDetector = "";

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status:detecting objects";

}
function preload() {
    img = loadImage("Bottles.jpeg");
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotResult)

}
function gotResult(error, results) {
    if (error) {
        console.log(error);
      
    }
    console.log(results);
    object = results;
}

function draw() {
   
    if (status != "") {
        image(img, 0, 0, 380, 380);
        r = random(255)
        g = random(255)
        b = random(255)
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "status:Object Detected";
            document.getElementById("number_of_objects").innerHTML = "number of objects detected are :" + object.length;
            fill(r, g, b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + "" + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke(r, b, g);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }




}