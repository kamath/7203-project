'use strict';

window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

var config = {
    type: 'line',
    data: {
        labels: [0, 1, 2, 3, 4, 5, 6],
        datasets: [{
            label: 'Distribution 1',
            borderColor: window.chartColors.red,
            backgroundColor: window.chartColors.red,
            data: [
                0, 1, 3, 5, 3, 1, 0
            ],
        }, {
            label: 'Distribution 2',
            borderColor: window.chartColors.blue,
            backgroundColor: window.chartColors.blue,
            data: [
                1, 0, 1, 0, 1, 0, 1
            ],
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Chart.js Line Chart - Stacked Area'
        },
        tooltips: {
            mode: 'index',
        },
        hover: {
            mode: 'index'
        },
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: false,
                    labelString: 'Month'
                }
            }],
            yAxes: [{
                stacked: true,
                scaleLabel: {
                    display: false,
                    labelString: 'Value'
                }
            }]
        }
    }
};

function loadCanvas() {
    var ctx = document.getElementById('KLAnimation').getContext('2d');
    setTimeout(() => window.myLine = new Chart(ctx, config), 1500);
}

function concentricBad() {
    var ctx = document.getElementById('concentricBad').getContext('2d');

    function makeChart(players) {
        // players is an array of objects where each object is something like:
        // {
        //   "Name": "Steffi Graf",
        //   "Weeks": "377",
        //   "Gender": "Female"
        // }
        console.log("PLAYERS", players)

        var playerLabels = players.map(function(d) {
            return d.Name;
        });
        var weeksData = players.map(function(d) {
            return { x: d.x, y: d.y };
        });
        var colors = players.map(function(d) {
            return (d.badColor === "1") ? "#ff6384" : "#36a2eb"
        })

        var chart = new Chart(ctx, {
            type: "scatter",
            options: {
                aspectRatio: 1,
                maintainAspectRatio: true,
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'k-NN Clustering',
                    fontSize: 20
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: true
                        },
                        ticks: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: true
                        },
                        ticks: {
                            display: false
                        }
                    }],
                }
            },
            data: {
                // labels: playerLabels,
                datasets: [{
                    data: weeksData,
                    backgroundColor: colors
                }]
            }
        });
    }

    // Request data using D3
    d3
        .csv("concentric_circles.csv")
        .then(makeChart);
}

function concentricGood() {
    var ctx = document.getElementById('concentricGood').getContext('2d');

    function makeChart(players) {
        // players is an array of objects where each object is something like:
        // {
        //   "Name": "Steffi Graf",
        //   "Weeks": "377",
        //   "Gender": "Female"
        // }
        console.log("PLAYERS", players)

        var playerLabels = players.map(function(d) {
            return d.Name;
        });
        var weeksData = players.map(function(d) {
            return { x: d.x, y: d.y };
        });
        var colors = players.map(function(d) {
            return (d.rightColor === "1") ? "#ff6384" : "#36a2eb"
        })

        var chart = new Chart(ctx, {
            type: "scatter",
            options: {
                aspectRatio: 1,
                maintainAspectRatio: true,
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Ideal Clustering',
                    fontSize: 20
                },
                borderWidth: 0,
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: true
                        },
                        ticks: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: true
                        },
                        ticks: {
                            display: false
                        }
                    }],
                }
            },
            data: {
                // labels: playerLabels,
                datasets: [{
                    data: weeksData,
                    backgroundColor: colors
                }]
            },
        });
    }

    // Request data using D3
    d3
        .csv("concentric_circles.csv")
        .then(makeChart);
}

function scatterLine() {
    var ctx = document.getElementById('scatterLine').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Bar Dataset',
                data: [{ x: 20, y: 30 }, { x: 20, y: 50 }, { x: 20, y: 70 }],
                fill: false,
                borderWidth: 5,
                borderColor: 'grey'
            }, {
                label: 'Line Dataset',
                data: [{ x: 50, y: 30 }, { x: 20, y: 50 }],
                type: 'scatter'
            }]
        }
    });
}

Plotly.d3.csv('swissRoll.csv', function(err, rows) {
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    var trace1 = {
        x: unpack(rows, 'x1'),
        y: unpack(rows, 'y1'),
        z: unpack(rows, 'z1'),
        mode: 'markers',
        marker: {
            size: 12,
            line: {
                color: 'rgba(217, 217, 217, 0.14)',
                width: 0.5
            },
            opacity: 0.8
        },
        type: 'scatter3d'
    };

    var trace2 = {
        x: unpack(rows, 'X'),
        y: unpack(rows, 'Y'),
        z: unpack(rows, 'Z'),
        mode: 'markers',
        marker: {
            color: 'rgb(127, 127, 127)',
            size: 12,
            symbol: 'circle',
            line: {
                color: 'rgb(204, 204, 204)',
                width: 1
            },
            opacity: 0.8
        },
        type: 'scatter3d'
    };

    var data = [trace1, trace2];
    var layout = {
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0
        }
    };
    Plotly.newPlot('myDiv', data, layout);
});

var g = new Dracula.Graph();

g.addEdge("strawberry", "cherry");
g.addEdge("strawberry", "apple");
g.addEdge("strawberry", "tomato");

g.addEdge("tomato", "apple");
g.addEdge("tomato", "kiwi");

g.addEdge("cherry", "apple");
g.addEdge("cherry", "kiwi");

var layouter = new Dracula.Layout.Spring(g);
layouter.layout();

const drawNodes = () => {
    var renderer = new Dracula.Renderer.Raphael('canvas', g, 400, 300);
    renderer.draw();
}