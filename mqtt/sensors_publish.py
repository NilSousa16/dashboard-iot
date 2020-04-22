# Importa o publish do paho-mqtt
import paho.mqtt.publish as publish
import time
import random

# Ip broker
ip = "192.168.1.101";

while 1 :
    value = random.randint(35,85)
    print("Humidity - ", value);
    publish.single("dev/humidity", value, hostname = ip)
    #Wait a second
    time.sleep(1.0);

    value = random.randint(20,40)
    print("Temperature - ", value);
    publish.single("dev/temperature", value, hostname = ip)
    #Wait a second
    time.sleep(1.0);

    value = random.randint(20,2000)
    print("Luminosity - ", value);
    publish.single("dev/luminosity", value, hostname = ip)
    #Wait a second
    time.sleep(1.0);

    value = random.randint(30,95)
    print("Sound - ", value);
    publish.single("dev/sound", value, hostname = ip)
    #Wait a second
    time.sleep(1.0);
