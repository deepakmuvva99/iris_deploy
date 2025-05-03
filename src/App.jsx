import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [features, setFeatures] = useState([0, 0, 0, 0]);
  const [result, setResult] = useState('');

  const handleChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = parseFloat(value);
    setFeatures(newFeatures);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/predict', {
        features,
      });
      setResult(res.data.prediction);
    } catch (error) {
      setResult('Error: Could not connect to backend');
    }
  };

  return (
    <div className="container">
      <h1>Iris Classifier 🌸</h1>
      <div className="form">
        {['Sepal Length', 'Sepal Width', 'Petal Length', 'Petal Width'].map(
          (label, i) => (
            <input
              key={i}
              type="number"
              step="0.1"
              placeholder={label}
              onChange={(e) => handleChange(i, e.target.value)}
            />
          )
        )}
        <button onClick={handleSubmit}>Predict</button>
        {result && <h2>Prediction: {result}</h2>}
      </div>
    </div>
  );
}

export default App;
