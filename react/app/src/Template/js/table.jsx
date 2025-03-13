import React, { useEffect, useState } from "react";
import axios from "axios";
import '../css/App.css'
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { WiHumidity } from "react-icons/wi";
const Table = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/table") // Appel à l'API
            .then((response) => {
                console.log("API Response:", response.data); // Vérifiez les données renvoyées
                setData(response.data.valeurs); // Met à jour les données

            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données :", error);
                setError("Impossible de récupérer les données.");

            });
    }, []);

    if (!data) {
        return (
        <div className="dash">
            <h1>Données du capteur</h1>

            <div>
            <p><strong>Temps écoulé :</strong> </p>
            <span className="da" style={{ fontSize: "30px" ,color: "rgba(75, 75, 75, 1)"}}></span>

            <div className="grp-card">
            <div className="card1">
            <p><strong>Température :</strong> °C</p>
            <span className="da" style={{ fontSize: "30px" ,color: "rgba(75, 75, 75, 1)"}}><LiaTemperatureHighSolid size={50}/></span>
            </div>

            <div className="card2">
            <p><strong>Humidité :</strong>%</p>
            <span className="da" style={{ fontSize: "30px" ,color: "rgba(75, 75, 75, 1)"}}><WiHumidity size={50}/></span>
            </div>
            </div>
            </div>
        </div>
    );
    }

    return (
        <div className="dash">
            <h1>Données du capteur</h1>

            <div>
            <p><strong>Temps écoulé :</strong> {data.date}</p>
            <span className="da" style={{ fontSize: "30px" ,color: "rgba(75, 75, 75, 1)"}}></span>

            <div className="grp-card">
            <div className="card1">
            <p><strong>Température :</strong> {data.temp}°C</p>
            <span className="da" style={{ fontSize: "30px" ,color: "rgba(75, 75, 75, 1)"}}><LiaTemperatureHighSolid size={50}/></span>
            </div>

            <div className="card2">
            <p><strong>Humidité :</strong> {data.hum}%</p>
            <span className="da" style={{ fontSize: "30px" ,color: "rgba(75, 75, 75, 1)"}}>
              <WiHumidity size={50}/>  </span>
            </div>
            </div>
            </div>
        </div>
    );
};

export default Table;
