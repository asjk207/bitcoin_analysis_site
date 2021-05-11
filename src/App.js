import { render } from '@testing-library/react';
import React from 'react';
import './App.css';
import Chart from './Components/Chart';

function App() {
  return (
    <body>
      <h1>BinanceChart(BTC)</h1>
      <Chart></Chart>
    </body>
  );
}

export default App;
