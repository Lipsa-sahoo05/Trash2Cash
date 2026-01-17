# Lightning Loop_15
Urvion_Eco_Hack
## ♻️ Trash2Cash
A smart waste management and reward platform built to promote recycling, resource efficiency, and responsible living.
## 🌍 Problem Statement:-
Improper waste segregation and lack of incentives lead to excessive landfill usage, resource wastage, and environmental pollution. Most people are unaware of the value of recyclable waste and do not receive motivation to dispose of it responsibly.
## 💡 Solution
Trash2Cash uses Machine Learning to:

- Predict reward points based on waste characteristics (weight, volume, grade)
- Store and analyze waste data using MongoDB Atlas
- Encourage responsible waste disposal through a reward-based system

This helps promote sustainable behavior and supports circular economy practices.
### ⚙️ Tech Stack
#### Frontend
- React.js
- HTML, CSS

#### Backend
- Python (Flask)
- Flask-CORS

#### Database
- MongoDB Atlas (Cloud NoSQL)

#### Machine Learning
- scikit-learn (Linear Regression, Quadratic Regressino)
- NumPy, Pandas
- Matplotlib.pyplot
- saved into pikl file

## **Project Structure**
Trash2Cash/
├── backend/
│ ├── app.py # Flask API + ML prediction logic
│ ├── model_linear.pkl # Linear regression model
│ ├── le.pkl # LabelEncoder for grade
│ └── model_params.pkl # Model parameters (max points, etc.)
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Body.jsx
│ │ │ ├── Control.jsx
│ │ │ ├── Header.jsx
│ │ │ ├── Footer.jsx
│ │ │ ├── Leaderboard.jsx
│ │ │ └── Profile.jsx
│ │ ├── App.jsx
│ │ ├── index.jsx
│ │ └── App.css
├── requirements.txt
└── README.md

## Dependecies:

Flask==2.3.4
flask-cors==3.0.10
numpy==1.26.0
joblib==1.3.2
pymongo[srv]==5.7.0
scikit-learn==1.3.2
Install dependencies:

pip install -r requirements.txt


Run Flask server:

python app.py


Frontend

1.Navigate to frontend:

cd frontend


2.Install dependencies:

npm install


3.Start development server:

npm run dev

## Usage

1.Login / Collector Login

  Login as general user or collector.

2.Collector Dashboard

  Submit collected plastic data (weight, volume, grade).

  Points are calculated based on ML model.

3.Impact Metrics

  Shows total plastic collected, carbon saved, trees saved.

4.Points & Redeem

  View points earned, redeem points for cash rewards.

5.Leaderboard

  Displays top collectors.

## *Machine Learning Model*

 Uses Linear Regression to predict points based on:

  Weight

  Volume

  Plastic Grade

 Points are capped using business rules (max points)

 Points converted to monetary value (points * 0.07)