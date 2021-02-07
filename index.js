//Importation des librairie
var express = require("express")
var bodyparser = require("body-parser")
var mqtt = require("mqtt")
var mysql = require('mysql');

var kern = express() //Variable server

//MQTT
const raspberry = mqtt.connect('mqtt://broker.hivemq.com') //client

/*console.log('Get connection ...');
var conn = mysql.createConnection({
  database: 'id16104626_compteur_de_temps',
  host: "localhost",
  user: "id16104626_arnaud_kolo",
  password: "<0GxQ6XA>wcre8wH"
}); 
conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});*/

var led_State = ''
var connected = ''
var t1_led1 = ''
var t2_led1 = ''
var t1_led2 = ''
var t2_led2 = ''
var t1_led3 = ''
var t2_led3 = ''
var t1_led4 = ''
var t2_led4 = ''
var t_led1 = ''
var t_led2 = ''
var t_led3 = ''
var t_led4 = ''
var t_led1_jour = ''
var t_led1_sem = ''
var t_led1_mois = ''
var t_led2_jour = ''
var t_led2_sem = ''
var t_led2_mois = ''
var t_led3_jour = ''
var t_led3_sem = ''
var t_led3_mois = ''
var t_led4_jour = ''
var t_led4_sem = ''
var t_led4_mois = ''
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
    if(led_State == "ON1"){
      Led1On()
      t1_led1 = Date.now()
      console.log(t1_led1)
    }
    if(led_State == "OFF1"){  
      Led1Off()
      t2_led1 = Date.now()
      console.log(t2_led1)
      if(t2_led1 > t1_led1){
        t_led1 = t2_led1-t1_led1;
      }
      console.log(t_led1)
      t_led1_jour = ((t_led1/1000)/3600)/24
      t_led1_sem = t_led1_jour/7
      t_led1_mois = t_led1_jour/30
      console.log('===========DUREE==============')
      console.log('EN JOUR : ')
      console.log(t_led1_jour)
      console.log('EN SEMAINE : ')
      console.log(t_led1_sem)
      console.log('EN MOIS : ')
      console.log(t_led1_mois)
    }
    else if(led_State == "ON2"){  
      Led2On()
      t1_led2 = Date.now()
      console.log(t1_led2)
    }
    if(led_State == "OFF2"){  
      Led2Off()
      t2_led2 = Date.now()
      console.log(t2_led2)
      if(t2_led2 > t1_led2){
        t_led2 = t2_led2-t1_led2;
      }
      console.log(t_led2)
      t_led2_jour = ((t_led2/1000)/3600)/24
      t_led2_sem = t_led2_jour/7
      t_led2_mois = t_led2_jour/30
      console.log('===========DUREE==============')
      console.log('EN JOUR : ')
      console.log(t_led2_jour)
      console.log('EN SEMAINE : ')
      console.log(t_led2_sem)
      console.log('EN MOIS : ')
      console.log(t_led2_mois)
    }
    else if(led_State == "ON3"){
      Led3On()
      t1_led3 = Date.now()
      console.log(t1_led3)
    }
    if(led_State == "OFF3"){  
      Led3Off()
      t2_led3 = Date.now()
      console.log(t2_led3)
      if(t2_led3 > t1_led3){
        t_led3 = t2_led3-t1_led3;
      }
      console.log(t_led3)
      t_led3_jour = ((t_led3/1000)/3600)/24
      t_led3_sem = t_led3_jour/7
      t_led3_mois = t_led3_jour/30
      console.log('===========DUREE==============')
      console.log('EN JOUR : ')
      console.log(t_led3_jour)
      console.log('EN SEMAINE : ')
      console.log(t_led3_sem)
      console.log('EN MOIS : ')
      console.log(t_led3_mois)
    }
    else if(led_State == "ON4"){
      Led4On()
      t1_led4 = Date.now()
      console.log(t1_led4)
    }
    if(led_State == "OFF4"){  
      Led4Off()
      t2_led4 = Date.now()
      console.log(t2_led4)
      if(t2_led4 > t1_led4){
        t_led4 = t2_led4-t1_led4;
      }
      console.log(t_led4)
      t_led4_jour = ((t_led4/1000)/3600)/24
      t_led4_sem = t_led4_jour/7
      t_led4_mois = t_led4_jour/30
      console.log('===========DUREE==============')
      console.log('EN JOUR : ')
      console.log(t_led4_jour)
      console.log('EN SEMAINE : ')
      console.log(t_led4_sem)
      console.log('EN MOIS : ')
      console.log(t_led4_mois)
    }
   // PutTime(t_led1,t_led2,t_led3,t_led4)
  }
//Cote ESP_12
//Allumage
function Led1On () {
  raspberry.publish('Kolo_topic2/State', 'ON1')
}
function Led2On () {
  raspberry.publish('Kolo_topic2/State', 'ON2')
  
}
function Led3On () {
  raspberry.publish('Kolo_topic2/State', 'ON3')
}
function Led4On () {
  raspberry.publish('Kolo_topic2/State', 'ON4')
}
//Extinction
function Led1Off () {
  raspberry.publish('Kolo_topic2/State', 'OFF1')
}
function Led2Off () {
  raspberry.publish('Kolo_topic2/State', 'OFF2')
}
function Led3Off () {
  raspberry.publish('Kolo_topic2/State', 'OFF3')
}
function Led4Off () {
  raspberry.publish('Kolo_topic2/State', 'OFF4')
}

function PutTime(T1, T2, T3, T4)
{
	conn.run('INSERT INTO temps(Tled1, Tled2, Tled3, Tled4) VALUES(?,?,?,?)', [T1, T2, T3, T4], function(err) {
   			 if (err) {
      				return console.log(err.message);
    				}
    			console.log('A row has been inserted');
  			});
}

kern.listen(55000) //Port pour ecouter les requetes HTTP