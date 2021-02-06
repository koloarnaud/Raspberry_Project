//Importation des librairie
var express = require("express")
var bodyparser = require("body-parser")
var mqtt = require("mqtt")

var kern = express() //Variable server


//MQTT
const raspberry = mqtt.connect('mqtt://broker.hivemq.com') //client

var led_State = ''
var connected = ''
//souscription de la raspberry au topic de l_ESP32
raspberry.on('connect', () => {
  // 
  raspberry.subscribe('Kolo_topic1/connected')
  raspberry.subscribe('Kolo_topic1/state')
})


raspberry.on('message', (topic, message) => {
  switch (topic) {
    case 'Kolo_topic1/connected':
      return ESP32_Connected(message)
    case 'Kolo_topic1/state':
      return ESP32_State(message)
  }
  console.log('Nothing for topic : %s', topic)
})

function ESP32_Connected (message) {
    console.log('ESP32 connexion is %s', message)
    connected = message.toString()
}

function ESP32_State (message) {
    //led_State = message
    console.log('ESP32 send %s', message)
    led_State = message.toString()
    if(led_State == "ON"){  
      LedOn()
    }
    else{
        LedOff()
    }
  }

//Cote ESP_12
function LedOn () {
    raspberry.publish('Kolo_topic2/State', 'ON')
}

function LedOff () {
      raspberry.publish('Kolo_topic2/State', 'OFF')
  }

kern.listen(55000) //Port pour ecouter les requetes HTTP