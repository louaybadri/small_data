import { useEffect, useState } from 'react';
import { Chart } from 'react-charts';
import io from 'socket.io-client';


function MyChart() {

    useEffect(() => {
        const socket = io('http://localhost:3005');
        socket.on('dataChange', (data) => {
            console.log(data);
        });
    }, []);


    const axes = [
        { primary: true, type: 'linear', position: 'bottom' },
        { type: 'linear', position: 'left' }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <div style={{ width: '50%', height: '300px' }}>
                Hi there
            </div>

            <div style={{ width: '50%', height: '300px' }}>
                {/* <Chart data={data2} axes={axes} /> */}
            </div>
        </div>
    );

}

export default MyChart;
