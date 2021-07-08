prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 100
});

camera = document.getElementById("camera");

Webcam.attach('#camera')

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';

    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/kE047LhUe/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded');
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "The second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1, speak_data_2);
    synth.speak(utterThis);
}

function predict_emoji() {

    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {

        console.error(error);

    } else {

        console.log(results);
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        document.getElementById("result_emotion_name").innerHTML = prediction_1;
        document.getElementById("result_emotion_name2").innerHTML = prediction_2;

        speak();
        if (prediction_1 == "Happy") {
            document.getElementById("result_emoji").innerHTML = "&#128522;";
        }

        if (prediction_1 == "Sad") {
            document.getElementById("result_emoji").innerHTML = "&#128532;";
        }

        if (prediction_1 == "Angry") {
            document.getElementById("result_emoji").innerHTML = "&#128548;";
        }

        if (prediction_2 == "Happy") {
            document.getElementById("result_emoji2").innerHTML = "&#128513;";
        }

        if (prediction_2 == "Sad") {
            document.getElementById("result_emoji2").innerHTML = "&#128553;";
        }

        if (prediction_2 == "Angry") {
            document.getElementById("result_emoji2").innerHTML = "&#128544;";
        }
    }
}