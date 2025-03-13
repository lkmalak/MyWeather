import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HiBellAlert } from "react-icons/hi2";
import '../css/App.css';

const Incid = () => {
    const [data, setData] = useState([]); // Initialize as an empty array
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Add a loading state

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/incd-data")
            .then((response) => {
                console.log("API Response:", response.data);
                setData(response.data.valeurs || []); // Ensure data is an array
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données :", error);
                setError("Impossible de récupérer les données.");
                setLoading(false);
            });
    }, []);

    // Handle loading state
    if (loading) {
        return <div>Chargement des données...</div>;
    }

    // Handle error state
    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="incd-list">
            <h3 className="caption"><span><HiBellAlert className="alrticon" size={50}/></span>   Liste des incidents</h3>
            <table>
                <thead>
                    <tr>
                        <th>Incident ID</th>
                        <th>Température</th>
                        <th>Humidité</th>
                        <th>Date d'incident</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.temp}</td>
                            <td>{item.hum}</td>
                            <td>{item.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Incid;
