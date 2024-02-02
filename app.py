from flask import Flask, request, jsonify, render_template, send_from_directory
import joblib
import numpy as np
import os

app = Flask(__name__)

# Load the pre-trained model
model = joblib.load('iris_model.pkl')

# API endpoint for model prediction
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = np.array(data['features']).reshape(1, -1)
    
    prediction = model.predict(features)[0]
    print("Prediction Type:", type(prediction))  # Check the type of prediction
    print("Prediction Value:", prediction)  # Print the prediction value

    target_names = ['setosa', 'versicolor', 'virginica']
    predicted_class = 'Unknown'  # Default value if prediction is invalid
    
    if prediction in target_names:
        predicted_class = prediction
    else:
        print("Invalid prediction value:", prediction)
        
    print("Predicted Class:", predicted_class)
    return jsonify({'prediction': predicted_class})

# Route for the root URL ("/")
@app.route('/')
def index():
    return render_template('index.html')

# Route for the favicon.ico file
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == '__main__':
    app.run(debug=True)
