let ctx1 = document.getElementById('patientChart').getContext('2d');
let ctx2 = document.getElementById('recoveredChart').getContext('2d');
let ctx3 = document.getElementById('deathChart').getContext('2d');

const patientRecord = []
const deathRate = []
const recoveredData = []
const date = []

// https://corona.lmao.ninja/v2/jhucsse
const url = 'https://pomber.github.io/covid19/timeseries.json'


getData()
fillData()
async function getData() {
    fetch(url)
        .then(res => res.json())
        .then(res => {
            res.Bangladesh.map(data => {

                patientRecord.push(data.confirmed)
                recoveredData.push(data.recovered)
                deathRate.push(data.deaths)
                date.push(data.date)

            });
            fillData()
        });


}


function fillData() {
    // await getData()
    const patientChartJS = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: date,
            datasets: [{
                label: '# of Patient',
                data: patientRecord,
                // data: dataFromAPI,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',

                ],
                borderWidth: 3,
                fill: true
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },

        }
    });
    // dataFromAPI.forEach(element => {
    //     console.log(element);
    // });

    // recovered Chart

    const recoveredChart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: date,
            datasets: [{
                label: '# of Recovery',
                data: recoveredData,
                // data: dataFromAPI,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',

                ],
                borderWidth: 3,
                fill: true
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },

        }
    });



    // deathChart
    const deathChart = new Chart(ctx3, {
        type: 'line',
        data: {
            labels: date,
            datasets: [{
                label: '# of Deaths',
                data: deathRate,
                // data: dataFromAPI,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',

                ],
                borderWidth: 3,
                fill: true
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },

        }
    });





}