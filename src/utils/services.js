
function formatData(allData) {
    // const data = [
    //     {
    //         "_id": "6638b78ceb4d1fd6a2ba1266",
    //         "capital": "eKabeul",
    //         "max_temp": 20.32,
    //         "latest_date": "2023-08-14"
    //     },
    //     {
    //         "_id": "6638b81feb4d1fd6a2bc2c7f",
    //         "capital": "wTirana",
    //         "max_temp": 32.4,
    //         "latest_date": "2023-08-14"
    //     },
    //     {
    //         "_id": "6638b8ffeb4d1fd6a2bf84c4",
    //         "capital": "Algtestiers",
    //         "max_temp": 40.1,
    //         "latest_date": "2023-08-14"
    //     },
    //     {
    //         "_id": "6638b9e1eb4d1fd6a2c29a87",
    //         "capital": "Pawwo Pago",
    //         "max_temp": 28.2,
    //         "latest_date": "2023-01-01"
    //     },
    //     {
    //         "_id": "6638ffebeb4d1fd6a2bd6ea0",
    //         "capital": "Kabul",
    //         "max_temp": 29.3,
    //         "latest_date": "2023-08-14"
    //     },
    //     {
    //         "_id": "663900b1eb4d1fd6a2c04303",
    //         "capital": "Tirana",
    //         "max_temp": 32.4,
    //         "latest_date": "2023-08-14"
    //     },
    //     {
    //         "_id": "66390197eb4d1fd6a2c35d63",
    //         "capital": "Algiers",
    //         "max_temp": 40.1,
    //         "latest_date": "2023-08-14"
    //     },
    //     {
    //         "_id": "66390279eb4d1fd6a2c69172",
    //         "capital": "Pago Pago",
    //         "max_temp": 29.7,
    //         "latest_date": "2023-08-14"
    //     },
    //     {
    //         "_id": "6639035eeb4d1fd6a2c9c482",
    //         "capital": "Luanda",
    //         "max_temp": 29.2,
    //         "latest_date": "2023-08-14"
    //     },
    //     {
    //         "_id": "6639043eeb4d1fd6a2cce2af",
    //         "capital": "The Valley",
    //         "max_temp": 29.7,
    //         "latest_date": "2023-08-14"
    //     },
    //     {
    //         "_id": "6639051feb4d1fd6a2d003d7",
    //         "capital": "Saint John's",
    //         "max_temp": 23.9,
    //         "latest_date": "2023-08-14"
    //     },
    //     {
    //         "_id": "663905ffeb4d1fd6a2d34729",
    //         "capital": "Buenos Aires",
    //         "max_temp": 33.5,
    //         "latest_date": "2023-05-02"
    //     }
    // ]

    const data = allData;
    // console.log(data);
    var options = {

        series: [{
            data: data.map(item => item.max_temp)
        }],
        chart: {
            type: 'bar',
            height: 100 * allData.length
        },
        tooltip: {
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                console.log(data);
                console.log(dataPointIndex);
                return '<div class="arrow_box">' +
                    '<span>' + data[dataPointIndex]?.latest_date ?? 'undefined' + '</span>' +
                    '</div>'
            }
        }, noData: {
            text: 'Loading...'
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusApplication: 'end',
                horizontal: true,
            }
        },
        text: {
            text: "test"
        },
        xaxis: {
            categories: data.map(item => item.capital),
        }
    };
    return options;

}




export { formatData }