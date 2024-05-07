import React, { useEffect, useState } from "react";
import axios from "axios";
import { csv } from "d3-fetch";
import {
    ComposableMap,
    Geographies,
    Geography,
    Sphere,
    Graticule,
} from "react-simple-maps";

const geoUrl = "../../features.json";


const MapChart = () => {
    const [data, setData] = useState([]);
    function getRedIntensityColor(value, min, max) {
        // Normalize the value to a number between 0 and 1
        var normalizedValue = 1 - (value - min) / (max - min);

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
    // useEffect(() => {
    //     async function fetchAllData() {
    //         const response = await axios.get("http://localhost:3005/batch/all");
    //         // console.log(response);
    //         if (response.data.success) {
    //             // console.log(response.data.value);
    //             setAllData(response.data.value);
    //         } else {
    //             console.log('====================================');
    //             console.log("Error");
    //             console.log('====================================');
    //         }
    //     }
    //     fetchAllData();
    // }, []);

    return (
        <ComposableMap
            projectionConfig={{
                rotate: [-10, 0, 0],
                scale: 147,
            }}
        >
            <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
            <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
            {data.length > 0 && (
                <Geographies geography={geoUrl}>
                    {
                        ({ geographies }) => {
                            console.log(geographies);
                            return geographies.map((geo, index) => {
                                // const value = allData[index];
                                console.log(geo);

                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        // fill={getRedIntensityColor(index, minValue, maxValue)}
                                        fill={getRedIntensityColor(index, 0, geographies.length)}
                                    />
                                );
                            }

                            )
                        }
                    }
                </Geographies>
            )}
        </ComposableMap>
    );
};

export default MapChart;
