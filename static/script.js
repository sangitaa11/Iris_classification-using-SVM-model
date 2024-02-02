// static/script.js

function classify() {
    const sepal_length = document.getElementById('sepal_length').value;
    const sepal_width = document.getElementById('sepal_width').value;
    const petal_length = document.getElementById('petal_length').value;
    const petal_width = document.getElementById('petal_width').value;

    // Construct features array with numerical values
    const features = [
        parseFloat(sepal_length),
        parseFloat(sepal_width),
        parseFloat(petal_length),
        parseFloat(petal_width)
    ];

    // Send POST request to /predict endpoint
    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features }), // Convert features array to JSON string
    })
    .then(response => response.json())
    .then(data => {
        // Ensure that the prediction key exists in the response data
        if ('prediction' in data) {
            document.getElementById('result').innerText = `Predicted Class: ${data.prediction}`;
            showFlowerImage(data.prediction);
        } else {
            console.error('Prediction key not found in response data:', data);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


function showFlowerImage(prediction) {
    console.log("Prediction:", prediction); // Log the prediction
    const flowerImages = {
        'setosa': 'static/images/setosa.jpg',
        'versicolor': 'static/images/versicolor.jpeg',
        'virginica': 'static/images/virginica.jpg'
    };    
    const imageSrc = flowerImages[prediction];
    console.log("Image Source:", imageSrc); // Log the image source
    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    imageElement.alt = prediction;
    imageElement.width = 160; 
    imageElement.height = 160; 
    document.getElementById('flower-images').innerHTML = '';
    document.getElementById('flower-images').appendChild(imageElement);
}
