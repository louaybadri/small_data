

function formatBatchData(allData) {
    const data = allData;
    // {
    //     "_id": "663a1c22eb4d1fd6a2a49174",
    //     "capital": "Afghanistan - Kabul",
    //     "average_temperature": 14.028608322143555
    // },
    // {
    //     "_id": "663a1c22eb4d1fd6a2a49256",
    //     "capital": "Albania - Tirana",
    //     "average_temperature": 15.988997459411621
    // },
    // {
    //     "_id": "663a1c22eb4d1fd6a2a49347",
    //     "capital": "Algeria - Algiers",
    //     "average_temperature": 17.697725296020508
    // },
    // {
    //     "_id": "663a1c22eb4d1fd6a2a49429",
    //     "capital": "American Samoa - Pago Pago",
    //     "average_temperature": 27.62051773071289
    // },

    var options = {

        series: [{
            data: data.map(item => item.average_temperature)
        }],
        chart: {
            type: 'bar',
            height: 50 * allData.length
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
    return options
}

function formatStreamData(allData) {

    const data = allData;
    var options = {

        series: [{
            data: data.map(item => item.max_temp)
        }],
        chart: {
            type: 'bar',
            height: 50 * allData.length
        },
        tooltip: {
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                // console.log(data);
                // console.log(dataPointIndex);
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




export { formatStreamData, formatBatchData }