import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib

# Sample training data
data = [
    [0, 0, 0, 0, 0, 0, 0, 80, 2, "LOW"],
    [1, 0, 0, 0, 0, 0, 0, 90, 3, "LOW"],
    [1, 1, 0, 1, 0, 1, 0, 105, 5, "MEDIUM"],
    [1, 1, 1, 1, 1, 1, 1, 130, 8, "HIGH"],
    [0, 1, 1, 0, 1, 0, 1, 125, 7, "HIGH"],
    [0, 1, 0, 1, 0, 1, 1, 115, 6, "MEDIUM"],
    [1, 0, 1, 0, 1, 1, 0, 120, 7, "HIGH"],
    [0, 0, 0, 1, 0, 1, 0, 98, 4, "LOW"],
    [1, 1, 0, 0, 1, 1, 1, 122, 7, "HIGH"],
    [0, 0, 0, 0, 1, 0, 0, 88, 3, "LOW"],
    [1, 0, 0, 1, 1, 1, 0, 110, 6, "MEDIUM"],
    [1, 1, 1, 0, 1, 1, 1, 140, 9, "HIGH"],
]

columns = [
    "voice_detected",
    "shake_detected",
    "fall_detected",
    "running_detected",
    "loud_noise",
    "late_night",
    "unknown_location",
    "heart_rate",
    "stress_level",
    "risk_level"
]

df = pd.DataFrame(data, columns=columns)

X = df.drop("risk_level", axis=1)
y = df["risk_level"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

predictions = model.predict(X_test)
print(classification_report(y_test, predictions))

joblib.dump(model, "risk_model.pkl")
print("Model saved as risk_model.pkl")