import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { Line } from 'react-chartjs-2';
import '../css/App.css';

const Temp = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/chart-data/')
      .then(response => {
        const data = response.data;

        // Transformation des données de l'API pour correspondre au format attendu par Chart.js
        const chartDataFormatted = data.temps.map((date, index) => ({
          label: data.temps[index],
          temperature: data.temperature[index],
        }));

        setChartData(chartDataFormatted);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);

  const data = {
    labels: chartData.map(item => item.label),
    datasets: [
      {
        label: 'Temperature',
        data: chartData.map(item => item.temperature),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2 className="chartT"><LiaTemperatureHighSolid className="alrticon" size={75}/>Diagramme de Temperature </h2>
      <Line data={data} height={600} width={1000}/>
    </div>
  );
};

export default Temp;
