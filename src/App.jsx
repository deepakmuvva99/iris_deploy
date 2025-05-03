import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [features, setFeatures] = useState(["", "", "", ""]);
  const [prediction, setPrediction] = useState("");

  const handleChange = (index, value) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://iris-backend-1-xfs8.onrender.com/predict', {
        features: features.map(Number)
      });
      setPrediction(response.data.prediction);
    } catch (err) {
      setPrediction("Error: " + err.message);
    }
  };

  return (
    <div className="app">
      <h1>Iris Flower Predictor 🌸</h1>
      <div className="form">
        {["Sepal Length", "Sepal Width", "Petal Length", "Petal Width"].map((label, i) => (
          <input
            key={i}
            type="number"
            placeholder={label}
            value={features[i]}
            onChange={(e) => handleChange(i, e.target.value)}
          />
        ))}
        <button onClick={handleSubmit}>Predict</button>
        {prediction && <h2>Prediction: {prediction}</h2>}
      </div>
    </div>
  );
}

export default App;
