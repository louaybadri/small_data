import React, { useEffect, useState } from "react";
import axios from "axios";
import io from 'socket.io-client';
import {
    ComposableMap,
    Geographies,
    Geography,
    Sphere,
    Graticule,
} from "react-simple-maps";
import toast, { Toaster } from 'react-hot-toast';
const geoUrl = "../../features.json";


const MapStreamChart = () => {
    function getRedIntensityColor(value, min, max) {
        // Normalize the value to a number between 0 and 1
        var normalizedValue = 1 - (value - min) / (max - min);
        //get the integer part of the normalized value
        // Convert the normalized value to a hexadecimal color code
        var color =
            "#FF" +
            Math.floor(normalizedValue * 255)
                .toString(16)
                .padStart(2, "0") +
            Math.floor(normalizedValue * 255)
                .toString(16)
                .padStart(2, "0");

        return color;
    }
    const [allData, setAllData] = useState([]);
    const [maxValue, setMaxValue] = useState(0);
    const [minValue, setMinValue] = useState(0);
    const [chart, setChart] = useState(null);
    useEffect(() => {
        async function fetchAllData() {
            const response = await axios.get("http://localhost:3005/stream/all");
            // console.log(response);
            if (response.data.success) {
                // console.log(response.data.value);
                setAllData(response.data.value);
                const max = Math.max(...response.data.value.map(item => item.max_temp));
                const min = Math.min(...response.data.value.map(item => item.max_temp));
                // console.log(max, min);
                setMaxValue(max);
                setMinValue(min);
            } else {
                console.log('====================================');
                console.log("Error");
                console.log('====================================');
            }
        }
        fetchAllData();
    }, []);
    useEffect(() => {
        const socket = io('http://localhost:3005');
        socket.on('dataChange', (data) => {
            console.log("data received");
            const update = data.fullDocument
            console.log(update);
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
    const notify = () => toast('Here is your toast.', {
        duration: 4000,
        position: 'top-right',
    });
    return (<div><Toaster />
        <ComposableMap
            projectionConfig={{
                rotate: [-10, 0, 0],
                scale: 147,
            }}
        >
            <Sphere stroke="#ABCDEF" strokeWidth={0.5} />
            <Graticule stroke="#ABCDEF" strokeWidth={0.5} />
            <Geographies geography={geoUrl}>
                {
                    ({ geographies }) => {
                        // console.log(geographies);

                        return geographies.map((geo, index) => {
                            // const value = allData[index];
                            const value = allData.find(item => {
                                return geo.properties.name === item.country;
                            });
                            let result;
                            if (value?.max_temp) {

                                result = <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onClick={
                                        () => {

                                            // get only 3 digits after . in value.average_temperature

                                            toast(value.max_temp.toFixed(3) + " C", {
                                                style: {
                                                    borderRadius: '10px',
                                                    background: '#333',
                                                    color: '#fbf',
                                                    padding: '16px',
                                                    textAlign: 'center',
                                                }
                                            });

                                            toast("Max temps in " + value.capital + " is ", {
                                                style: {
                                                    borderRadius: '10px',
                                                    background: '#333',
                                                    color: '#fbf',
                                                },
                                            });
                                        }

                                    }
                                    // fill={getRedIntensityColor(index, minValue, maxValue)}
                                    fill={getRedIntensityColor(value.max_temp, minValue, maxValue)}
                                />
                            } else {
                                result = <Geography
                                    key={geo.rsmKey}
                                    geography={geo} onClick={
                                        () => {
                                            toast("No available data yet in " + geo.properties.name, {
                                                style: {
                                                    borderRadius: '10px',
                                                    background: '#333',
                                                    color: '#fbf',
                                                    padding: '16px',
                                                },
                                            });

                                        }
                                    }
                                    fill={getRedIntensityColor(index, minValue, maxValue)}
                                />
                            }
                            return result;
                        }

                        )
                    }
                }
            </Geographies>

        </ComposableMap></div>
    );
};

export default MapStreamChart;
