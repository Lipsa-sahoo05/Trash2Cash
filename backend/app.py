import pymongo
from flask import Flask, request, jsonify
from flask_cors import CORS

from datetime import datetime
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

user_data = []

# Load YOUR model files
model_linear = joblib.load('model_linear.pkl')
le = joblib.load('le.pkl')
model_params = joblib.load('model_params.pkl')

# MongoDB (update connection string)
# MongoDB Atlas connection
MONGO_URI ="mongodb+srv://cse24bcsh01_db_user:vsVY8pNUfUQdzfpu@cluster0sample.zv7lpib.mongodb.net/?appName=Cluster0Sample"

client = pymongo.MongoClient(MONGO_URI)
db = client["recycling_db"]
collections = db["collections"]

@app.route("/submit-data", methods=["POST"])
def submit_data():
    data = request.json
    
    # Validate
    required = ['collector_id','weight', 'volume', 'grade']
    if not all(data.get(k) for k in required):
        return jsonify({'error': 'Missing fields'}), 400
    
    # CALCULATE PREDICTION using YOUR TWO-STAGE MODEL
    try:
        grade_code = le.transform([data['grade']])[0]
        X = np.array([[float(data['weight']), float(data['volume']), grade_code]])
        
        # Stage 1: Uncapped prediction (your model)
        uncapped_points = model_linear.predict(X)[0]
        
        # Stage 2: Business capping (your logic)
        points = np.clip(uncapped_points, 0, model_params['max_points'])
        rupees = round(points * 0.07, 2)
        
    except Exception as e:
        points, rupees = 0, 0
    
    # Save to MongoDB WITH PREDICTION
    doc = {
       'weight': float(data['weight']),
        'volume': float(data['volume']),
        'grade': data['grade'],
        'collector_id': data['collector_id'],
        'density': float(data['weight']) / float(data['volume']),
        'predicted_points': round(points),
        'rupees_value': rupees,
        'location': data.get('location', 'Bhubaneswar'),
        'timestamp': datetime.now()
    }
    
    result = collections.insert_one(doc)
    user_data.append(data)
    return jsonify({"status": "success", "message": "Data stored!", 'predicted_points': round(points),'Rupees':rupees})

@app.route("/get-data", methods=['GET'])
def get_data():

    if not user_data:
        return jsonify({
            "user_data": [],
            "predicted_points": 0
        })

    try:
        # Read latest 50 documents from MongoDB
        data = list(collections.find().sort("timestamp", -1).limit(50))

        # Convert ObjectId to string (important for JSON)
        for doc in data:
            doc["_id"] = str(doc["_id"])
    except Exception as e:
        return e
    points = 0

    for entry in data:
        try:
            grade_code = le.transform([entry['grade']])[0]
            X = np.array([[float(entry['weight']), float(entry['volume']), grade_code]])

            uncapped_points = model_linear.predict(X)[0]
            capped_points = np.clip(uncapped_points, 0, model_params['max_points'])

            points += capped_points

        except Exception as e:
            print("Prediction error:", e)


    return jsonify({
        "user_data": user_data,
        "predicted_points": round(points)
    })


if __name__ == '__main__':
    print("🚀 Flask + YOUR MODEL running: http://localhost:5000")
    app.run(debug=True, port=5000) 