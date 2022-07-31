from umqtt.simple import MQTTClient
from machine import Timer
from machine import ADC
import network
import time
import dht
d = dht.DHT11(machine.Pin(14))
sta_if = network.WLAN(network.STA_IF)
if not sta_if.isconnected():
    print('connecting to network...')
    sta_if.active(True)
    sta_if.connect('HiveGuest', 'livingredefined')
    while not sta_if.isconnected():
        pass
print('network config:', sta_if.ifconfig())

SERVER = "10.60.2.151"            # Easy IoT MQTT server address
CLIENT_ID = "thermo_1"            # Client ID on your Easy IoT

TOPIC='main_kitchen_chiller'                     # Topic of your device on Easy IoT

try:
    c = MQTTClient(CLIENT_ID, SERVER, 1903, keepalive=30)   # MQTTClient class instance, and set the connection hold interval to 30 seconds
    c.connect()     # mqtt connects 
    print("Connected to %s" % SERVER)

    while True:
        d.measure()
        temp = d.temperature() # eg. 23 (°C)
        humidity = d.humidity()    # eg. 41 (% RH)
        print(str('{:.2f} degree and humdity {:.2f}'.format(temp, humidity) + f'{TOPIC}'))
        # FORAMT T:%.2f,H:%.2f,N:%
        # print(str('T:{%.2f},H:{%.2f},N:%s'.format(temp, humidity, TOPIC)))
        # levels = str('T:{%.2f},H:{%.2f},N:%s'.format(temp, humidity, TOPIC))
        levels = str('T:{:.2f},H:{:.2f}'.format(temp, humidity) + f',N:{TOPIC}')
        #publish water level every 5 seconds
        c.publish('main_kitchen', levels)         # Waiting for messages in a loop
        time.sleep(5)
except:

    c.disconnect()                     # When abnormal, disconnect MQTT