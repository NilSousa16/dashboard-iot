
var topics = ["dev/humidity", "dev/sound", "dev/temperature", "dev/luminosity"];

startConnect("192.168.1.101" ,"9001");

/**
 * 
 */
let sumTest = 0;

/**
 * Called after form input is processed
 * @param {string} host 
 * @param {string} port 
 */
function startConnect(host, port) {

    console.log("Entrou em startConnect");
    /**
     * Generate a random client ID
     *  */ 
    clientID = "clientID - " + parseInt(Math.random() * 100);
    /**
     * Show on console
     *  */    
    console.log("Topic: " + host + " Port: " + port);

    /**
     * Fetch the hostname/IP address and port number from the form    
     * */
    //host = document.getElementById("host").value;
    //port = document.getElementById("port").value;
    /**
     * Print output for the user in the messages div
     */
    // document.getElementById("messages").innerHTML += '<span>Connecting to: ' + host + ' on port: ' + port + '</span><br/>';
    //ndocument.getElementById("messages").innerHTML += '<span>Using the following client value: ' + clientID + '</span><br/>';

    /**
     * Initialize new Paho client connection
     */ 
    client = new Paho.MQTT.Client(host, Number(port), clientID);

    /**
     * Set callback handlers
     */
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    /**
     * Connect the client, if successful, call onConnect function
     *  */    
    client.connect({
        onSuccess: onConnect,
    });
}

/**
 * Called when the client connects
 *  */ 
function onConnect() {
    /**
     * Fetch the MQTT topic from the form
     * */
    topics.forEach(function(topic){ 
        /**
         * Show on console
         */
        console.log("Topic: " + topic);       
        client.subscribe(topic); 
    }); 
}

/**
 * Called when the client loses its connection
 * @param {*} responseObject 
 */
function onConnectionLost(responseObject) {
    console.log("onConnectionLost: Connection Lost");
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost: " + responseObject.errorMessage);
    }
}

function onStore(message) {
    sumTest += parseInt(message.payloadString);
    console.log("Valor acumulado: " + sumTest);
}

/**
 * Called when a message arrives
 * @param {string} message 
 */
function onMessageArrived(message) {   
    onStore(message)
    widgetChart(message);
    
    if(message.destinationName === "dev/humidity") {
        let item = findComponent(".instant", "humidity");        
        item.innerHTML = message.payloadString;
        
        counter("dev/humidity");

        item = findComponent(".averange", "humidity");
        accumulatorSum("dev/humidity", message.payloadString);
        
        average = sumHumidity/counterHumidity;
        item.innerHTML = "Average: " + average.toFixed(2);

        addRow("table-humidity", "dev/humidity", message.payloadString, counterHumidity);

    } else if(message.destinationName === "dev/sound") {
        let item = findComponent(".instant", "sound");
        item.innerHTML = message.payloadString;
        
        counter("dev/sound");
        
        item = findComponent(".averange", "sound");
        accumulatorSum("dev/sound", message.payloadString);
        
        average = sumSound/counterSound;
        item.innerHTML = "Average: " + average.toFixed(2);

        addRow("table-sound", "dev/sound", message.payloadString, counterSound);

    } else if(message.destinationName === "dev/temperature") {
        let item = findComponent(".instant", "temperature");
        item.innerHTML = message.payloadString;
        
        counter("dev/temperature");
        
        item = findComponent(".averange", "temperature");
        accumulatorSum("dev/temperature", message.payloadString);
        
        average = sumTemperature/counterTemperature;
        item.innerHTML = "Average: " + average.toFixed(2);

        addRow("table-temperature", "dev/temperature", message.payloadString, counterTemperature);

    } else if(message.destinationName === "dev/luminosity") {
        let item = findComponent(".instant", "luminosity");
        item.innerHTML = message.payloadString;
        
        counter("dev/luminosity");
        
        item = findComponent(".averange", "luminosity");
        accumulatorSum("dev/luminosity", message.payloadString);
        
        average = sumLuminosity/counterLuminosity;
        item.innerHTML = "Average: " + average.toFixed(2);

        addRow("table-luminosity", "dev/luminosity", message.payloadString, counterTemperature);
    }          
}

/**
 * Called when the disconnection button is pressed
 */
function startDisconnect() {
    client.disconnect();
}

/**
 * Search for specific component
 * @param {string} group 
 * @param {string} component 
 */
function findComponent(group, component) {
    item = document.querySelectorAll(group);   
    for(i = 0; i < item.length; i++){ 
        if(item[i].classList.value.search(component) > -1) {
            return item[i];
        }  
    }  
}

/**
 * Insert elements into tables
 * @param {string} idTable 
 * @param {string} topic 
 * @param {string} message 
 * @param {number} counter 
 */
function addRow(idTable, topic, message, counter) {

    /*var linha = "<tr>";
    linha += '<td class="cnes"> Item' + 3 + '</td>';
    linha += '<td class="cbo"> Item' + 4 + '</td>';
    linha += '</tr>';    
    $("#tabelaProducao tbody").prepend(linha);*/
   
    let line = "<tr>";
    line += '<th scope="col">' + counter + '</th>'
    line += '<td scope="col">' + dataFormat(new Date(), 0) + '</th>';
    line += '<td scope="col">' + topic + '</th>';
    line += '<td scope="col">' + message + '</th>';
    line += "<tr>";
    
    /**
     * JQuery template
     */
    $("#" + idTable + " tbody").prepend(line);

   /* var tabela = document.getElementById(idTable);
    var numeroLinhas = tabela.rows.length;
    var linha = tabela.insertRow(numeroLinhas);
    var celula1 = linha.insertCell(0);
    var celula2 = linha.insertCell(1);
    var celula3 = linha.insertCell(2);
    var celula4 = linha.insertCell(3);

    celula1.innerHTML = counter;
    celula2.innerHTML =  new Date();
    celula3.innerHTML =  topic;
    celula4.innerHTML =  message;*/
}

/**
 * Message count
 * @param {string} topic 
 */
function counter(topic){
    if(topic === "dev/humidity") {
        counterHumidity++;
    } else if(topic === "dev/sound") {
        counterSound++;
    } else if(topic === "dev/temperature") {
        counterTemperature++;
    } else if(topic === "dev/luminosity") {
        counterLuminosity++;
    }
}

/**
 * Value accumulator
 * @param {string} topic 
 * @param {string} value 
 */
function accumulatorSum(topic, value){
    if(topic === "dev/humidity") {
        sumHumidity += parseInt(value);
    } else if(topic === "dev/sound") {        
        sumSound += parseInt(value);
    } else if(topic === "dev/temperature") {
        sumTemperature += parseInt(value);
    } else if(topic === "dev/luminosity") {
        sumLuminosity += parseInt(value);
    }
}

/**
 * Format data
 * @param {Date} now 
 * @param {number} format 
 */
function dataFormat(now, format = -1){
    if(format === 0){
        return now.getMonth() + '/' + now.getDate() + '/' + now.getFullYear() + '-' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    } else if(format === 1) {
        return now.getMonth() + '/' + now.getDate() + '-' + now.getHours() + ':' + now.getMinutes();
    } else if(format === 2){        
        return now.getHours() + ':' + now.getMinutes()
    } else if(format === 3){
        console.log(now.getTime());
        return now;
    } else {
        return "not defined";
    }

    // function checkZero(number){
    //     if(number < 10){
    //         number += '0' + number;
    //     }
    // }

}

/**
 * Accountants
 *  */ 
let counterHumidity = 0;
let counterSound = 0;
let counterTemperature = 0;
let counterLuminosity = 0;

/**
 * Accumulators
 */
let sumHumidity = 0;
let sumSound = 0;
let sumTemperature = 0;
let sumLuminosity = 0;

/**
 * Test area
 */

var valor01 = 90;
var valor02 = 45;
var valor03 = 75;
var valor04 = 15;
var valor05 = 50;
var valor06 = 60;
var valor07 = 85;
let valor08 = 70;

// function add(x, y) {
//     return x + y;
// }

// module.exports = {
//     add: add,
// }

// export function add(x, y) {
//     return x + y;
// };

//export { valor01, valor02, valor03, valor04, valor05, valor06, valor07, valor08 };

// function valuePrint(){ 
//     console.log('Funcionou a importação ...');
// };
// console.log('VAI PASSANDO PELO PAHO-MQTT.JS');
// export default valuePrint;
