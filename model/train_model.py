import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import pickle
import os

# Sample dataset
data = {
    "voice_detected":[1,0,1,0,0,1],
    "shake_detected":[1,0,0,1,0,1],
    "fall_detected":[1,0,0,1,0,1],
    "running_detected":[1,0,0,1,0,1],
    "loud_noise":[1,0,0,1,0,1],
    "late_night":[1,0,1,0,0,1],
    "unknown_location":[1,0,0,1,0,1],
    "heart_rate":[140,70,80,130,75,150],
    "stress_level":[1,0,0,1,0,1],
    "risk":[2,0,0,2,0,2]
}

df = pd.DataFrame(data)

X = df.drop("risk", axis=1)
y = df["risk"]

model = RandomForestClassifier()

model.fit(X, y)

# ensure model folder exists
os.makedirs("model", exist_ok=True)

# save trained model
pickle.dump(model, open("model/risk_model.pkl", "wb"))

print("Model trained successfully and saved as risk_model.pkl")