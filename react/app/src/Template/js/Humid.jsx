import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/App.css';
import { WiHumidity } from "react-icons/wi";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Humidi = () => {

  const [chartData, setChartData] = useState({ temps: [], humidity: [] });

  // data => server
  useEffect(() => {
    axios.get('http://localhost:8000/chart-data') // data chart
      .then(response => {
        const data = response.data;
        // response contient 'temps' et 'humidity'
        setChartData({
          temps: data.temps,
          humidity: data.humidity,
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const data = {
    labels: chartData.temps, //  x-axe
    datasets: [
      {
        label: 'Humidity',
        data: chartData.humidity, //  y-axe data
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2 className="chartH" ><WiHumidity className="alrticon" size={75}/> Diagramme de Humidity </h2>
      <Line data={data} height={600} width={1000}/>
    </div>
  );
};

export default Humidi;
