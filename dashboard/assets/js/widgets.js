// /**
//  * ===================================
//  *          Graphics rendering
//  * ===================================
//  */

let chartHumidity = [];
let chartSound  = [];
let chartTemperature = [];
let chartLuminosity = [];

let contHumidity = 0;
let contSound = 0;
let contTemperature = 0;
let contLuminosity = 0;

function widgetChart(message) {
    /**
     * WidgetChartHumidity
     * */
    if(message.destinationName === "dev/humidity"){ 
        /**
         * Determines the amount of changed data to display on the chart
         *  */      
        contHumidity += 1;
       
        /**
         * Fills vector with 7 elements
         */
        if(chartHumidity.length <= 8){            
            chartHumidity.push(message.payloadString);
        } else {
            chartHumidity.shift();
            chartHumidity.push(message.payloadString);
        }
        
        /**
         * Responsible for presenting data in the graph
         */
        if(contHumidity === 7) {
            contHumidity = 0;

            /**
             * Assemble the chart
             */
            var ctx = document.getElementById( "widgetChart1" );
            ctx.height = 150;           
            myChart = new Chart( ctx, {
                type: 'line',
                data: {
                    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
                    type: 'line',
                    datasets: [ {
                        data: [chartHumidity[0], chartHumidity[1], chartHumidity[2], chartHumidity[3], chartHumidity[4], chartHumidity[5], chartHumidity[6]],
                        label: 'g/Kg',
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(255,255,255,.55)',
                    }, ]
                },
                options: {

                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    responsive: true,
                    scales: {
                        xAxes: [ {
                            gridLines: {
                                color: 'transparent',
                                zeroLineColor: 'transparent'
                            },
                            ticks: {
                                fontSize: 2,
                                fontColor: 'transparent'
                            }
                        } ],
                        yAxes: [ {
                            display:false,
                            ticks: {
                                display: false,
                            }
                        } ]
                    },
                    title: {
                        display: false,
                    },
                    elements: {
                        line: {
                            tension: 0.00001,
                            borderWidth: 1
                        },
                        point: {
                            radius: 4,
                            hitRadius: 10,
                            hoverRadius: 4
                        }
                    }
                }            
            } );
        }
    } 
    /**
    * WidgetChartSound
    * */
    else if(message.destinationName === "dev/sound") {
        /**
         * Determines the amount of changed data to display on the chart
         *  */      
        contSound += 1;
       
        /**
         * Fills vector with 7 elements
         */
        if(chartSound.length <= 8){            
            chartSound.push(message.payloadString);
        } else {
            chartSound.shift();
            chartSound.push(message.payloadString);
        }
        
        /**
         * Responsible for presenting data in the graph
         */
        if(contSound === 7) {
            contSound = 0;
            /**
             * Assemble the chart
             */
            var ctx = document.getElementById( "widgetChart2" );
            ctx.height = 150;
            var myChart = new Chart( ctx, {
                type: 'line',
                data: {
                    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
                    type: 'line',
                    datasets: [ {
                        data: [chartSound[0], chartSound[1], chartSound[2], chartSound[3], chartSound[4], chartSound[5], chartSound[6]],
                        label: 'dB',
                        backgroundColor: '#63c2de',
                        borderColor: 'rgba(255,255,255,.55)',
                    }, ]
                },
                options: {

                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    responsive: true,
                    scales: {
                        xAxes: [ {
                            gridLines: {
                                color: 'transparent',
                                zeroLineColor: 'transparent'
                            },
                            ticks: {
                                fontSize: 2,
                                fontColor: 'transparent'
                            }
                        } ],
                        yAxes: [ {
                            display:false,
                            ticks: {
                                display: false,
                            }
                        } ]
                    },
                    title: {
                        display: false,
                    },
                    elements: {
                        line: {
                            tension: 0.00001,
                            borderWidth: 1
                        },
                        point: {
                            radius: 4,
                            hitRadius: 10,
                            hoverRadius: 4
                        }
                    }
                }
            } );
        }
    } 
    /**
    * WidgetChartTemperature
    * */
    else if(message.destinationName === "dev/temperature") {
        /**
         * Determines the amount of changed data to display on the chart
         *  */      
        contTemperature += 1;
       
        /**
         * Fills vector with 7 elements
         */
        if(chartTemperature.length <= 8){            
            chartTemperature.push(message.payloadString);
        } else {
            chartTemperature.shift();
            chartTemperature.push(message.payloadString);
        }
        
        /**
         * Responsible for presenting data in the graph
         */
        if(contTemperature === 7) {
            contTemperature = 0;
            /**
             * Assemble the chart
             */
            var ctx = document.getElementById( "widgetChart3" );
            ctx.height = 70;
            var myChart = new Chart( ctx, {
                type: 'line',
                data: {
                    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
                    type: 'line',
                    datasets: [ {
                        data: [chartTemperature[0], chartTemperature[1], chartTemperature[2], chartTemperature[3], chartTemperature[4], chartTemperature[5], chartTemperature[6]],
                        label: 'ºC',
                        backgroundColor: 'rgba(255,255,255,.2)',
                        borderColor: 'rgba(255,255,255,.55)',
                    }, ]
                },
                options: {

                    maintainAspectRatio: true,
                    legend: {
                        display: false
                    },
                    responsive: true,
                    scales: {
                        xAxes: [ {
                            gridLines: {
                                color: 'transparent',
                                zeroLineColor: 'transparent'
                            },
                            ticks: {
                                fontSize: 2,
                                fontColor: 'transparent'
                            }
                        } ],
                        yAxes: [ {
                            display:false,
                            ticks: {
                                display: false,
                            }
                        } ]
                    },
                    title: {
                        display: false,
                    },
                    elements: {
                        line: {
                            borderWidth: 2
                        },
                        point: {
                            radius: 0,
                            hitRadius: 10,
                            hoverRadius: 4
                        }
                    }
                }
            } );
        }   
    } 
    /**
    * WidgetChartLuminosity
    * */
    else if(message.destinationName === "dev/luminosity") {
        /**
         * Determines the amount of changed data to display on the chart
         *  */      
        contLuminosity += 1;
       
        /**
         * Fills vector with 7 elements
         */
        if(chartLuminosity.length <= 8){            
            chartLuminosity.push(message.payloadString);
        } else {
            chartLuminosity.shift();
            chartLuminosity.push(message.payloadString);
        }
        
        /**
         * Responsible for presenting data in the graph
         */
        if(contLuminosity === 7) {
            contLuminosity = 0;
            /**
             * Assemble the chart
             */
            var ctx = document.getElementById( "widgetChart4" );
            ctx.height = 150;
            var myChart = new Chart( ctx, {
                type: 'bar',
                data: {
                    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
                    datasets: [ {
                        data: [chartLuminosity[0], chartLuminosity[1], chartLuminosity[2], chartLuminosity[3], chartLuminosity[4], chartLuminosity[5], chartLuminosity[6]],
                        label: 'lx',
                        borderColor: "rgba(0, 123, 255, 0.9)",
                        //borderWidth: "0",
                        backgroundColor: "rgba(255,255,255,.3)"
                    } ]
                },
                options: {
                    maintainAspectRatio: true,
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                        display: false,
                        categoryPercentage: 1,
                        barPercentage: 0.5
                        }],
                        yAxes: [ {
                            display: false
                        } ]
                    }
                }
            } );
        }    
    }
}
