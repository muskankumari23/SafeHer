import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import joblib
import os

def generate_synthetic_data(num_samples=1000):
    """
    Generate synthetic data for training the safety model.
    Features:
    - time_of_day: 0 to 23 (hour)
    - crime_rate: 0.0 to 10.0 (e.g., incidents per 1000 people)
    - population_density: 100 to 20000 (people per sq km)
    """
    np.random.seed(42)
    
    time_of_day = np.random.uniform(0, 24, num_samples)
    crime_rate = np.random.uniform(0, 10, num_samples)
    population_density = np.random.uniform(100, 20000, num_samples)
    
    # Calculate safety score based on a hidden formula
    # Base score
    score = 100.0
    
    # Penalty for crime rate (linear penalty)
    score -= crime_rate * 5  # Max penalty: 50
    
    # Penalty for time of day (night time is less safe)
    # Night: 20:00 to 05:00
    is_night = (time_of_day >= 20) | (time_of_day <= 5)
    score[is_night] -= 15
    
    # Benefit for population density (eyes on the street), up to a certain point
    # Normalize density to 0-1
    norm_density = population_density / 20000
    score += norm_density * 10
    
    # Add some random noise
    score += np.random.normal(0, 5, num_samples)
    
    # Clip between 0 and 100
    score = np.clip(score, 0, 100)
    
    return pd.DataFrame({
        'time_of_day': time_of_day,
        'crime_rate': crime_rate,
        'population_density': population_density,
        'safety_score': score
    })

def train_model():
    print("Generating synthetic data...")
    df = generate_synthetic_data(5000)
    
    X = df[['time_of_day', 'crime_rate', 'population_density']]
    y = df['safety_score']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training RandomForestRegressor...")
    model = RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42)
    model.fit(X_train, y_train)
    
    predictions = model.predict(X_test)
    mse = mean_squared_error(y_test, predictions)
    print(f"Model trained. Test MSE: {mse:.2f}")
    
    # Save the model
    model_path = os.path.join(os.path.dirname(__file__), 'location_safety_model.pkl')
    joblib.dump(model, model_path)
    print(f"Model saved to {model_path}")

if __name__ == '__main__':
    train_model()
