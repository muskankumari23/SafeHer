import pickle
import numpy as np

model = pickle.load(open("model/risk_model.pkl","rb"))

def predict_risk(features):

    features = np.array(features).reshape(1,-1)
    result = model.predict(features)

    return result[0]