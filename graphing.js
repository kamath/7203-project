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
                    text: 'k-Means Clustering',
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

function moonsBad() {
    var ctx = document.getElementById('moonsBad').getContext('2d');

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
                    text: 'k-Means Clustering',
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
        .csv("moons.csv")
        .then(makeChart);
}

function moonsGood() {
    var ctx = document.getElementById('moonsGood').getContext('2d');

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
                    text: 'Spectral Clustering',
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
        .csv("moons.csv")
        .then(makeChart);
}

function NBA() {
    var ctx = document.getElementById('NBA').getContext('2d');

    function makeChart(players) {
        // players is an array of objects where each object is something like:
        // {
        //   "Name": "Steffi Graf",
        //   "Weeks": "377",
        //   "Gender": "Female"
        // }
        console.log("PLAYERS", players)

        var playerLabels = players.map(function(d) {
            return d.player;
        });
        var weeksData = players.map(function(d) {
            return { x: d.x, y: d.y, label: d.player };
        });
        var colors = players.map(function(d) {
            const COLOR_ARR = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'];
            console.log("COLOR", COLOR_ARR[parseInt(d.cluster)])
            return COLOR_ARR[parseInt(d.cluster)]
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
                    text: 'Player Matchups',
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
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            console.log("TOOLTIPITEM", tooltipItem, data)
                            var label = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].label;
                            console.log("LABEL", label)

                            if (label) {
                                label += ': ';
                            }
                            label += Math.round(tooltipItem.yLabel * 100) / 100;
                            return label;
                        }
                    }
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
        .csv("nba_clusters.csv")
        .then(makeChart);
}