import { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts'
import { formatBatchData } from "../utils/services.js"
import axios from "axios";

function BatchChart() {
    const [allData, setAllData] = useState([]);
    const [chart, setChart] = useState(null);
    useEffect(() => {
        async function fetchAllData() {
            const response = await axios.get("http://localhost:3005/batch/all");
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
            var options = formatBatchData(allData);
            if (chart) {
                chart.updateOptions(options); // Update the chart data
            } else {
                const newChart = new ApexCharts(document.querySelector("#streamChart"), options);
                setChart(newChart);
                newChart.render();
            }
        }
    }, [allData]);

    return (
        <div style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            {allData.length === 0 && <h1>Data Not Available Yet</h1>}
            {allData.length > 0 && <h1>Weather Forecast</h1>}
            <div id="streamChart" style={{ width: '90vw' }}></div>
        </div>
    );
}

export default BatchChart;
