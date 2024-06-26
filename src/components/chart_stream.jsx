import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ApexCharts from 'apexcharts'
import { formatStreamData } from "../utils/services.js"
import axios from "axios";

function StreamChart() {
    const [allData, setAllData] = useState([]);
    const [chart, setChart] = useState(null);
    useEffect(() => {
        async function fetchAllData() {
            const response = await axios.get("http://localhost:3005/stream/all");
            // console.log(response);
            if (response.data.success) {
                // console.log(response.data.value);
                setAllData(response.data.value);
            } else {
                console.log('====================================');
                console.log("Error");
                console.log('====================================');
            }
        }
        fetchAllData();
    }, []);

    useEffect(() => {
        if (allData.length > 0) {
            var options = formatStreamData(allData);
            if (chart) {
                chart.updateOptions(options); // Update the chart data
            } else {
                const newChart = new ApexCharts(document.querySelector("#chart"), options);
                setChart(newChart);
                newChart.render();
            }
        }
    }, [allData]);
    useEffect(() => {
        const socket = io('http://localhost:3005');
        socket.on('dataChange', (data) => {
            console.log("data received");
            const update = data.fullDocument

            if (update) {
                async function fetchAllData() {
                    const response = await axios.get("http://localhost:3005/stream/all");
                    // console.log(response);
                    if (response.data.success) {
                        // console.log(response.data.value);
                        setAllData(response.data.value);
                    } else {
                        console.log('====================================');
                        console.log("Error");
                        console.log('====================================');
                    }
                }
                fetchAllData();
            }
        });

    }, []); // This effect runs once on mount
    return (
        <div style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            {allData.length === 0 && <h1>Data is not yet available</h1>}
            {allData.length > 0 && <h1>Weather Forecast</h1>}
            <div id="chart" style={{ width: '90vw' }}></div>
        </div>
    );
}

export default StreamChart;
