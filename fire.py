from tempfile import tempdir
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from datetime import datetime
# Fetch the service account key JSON file contents
cred = credentials.Certificate('infinite-rope-685-firebase-adminsdk-5ej3i-b3da8557b2.json')
# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://infinite-rope-685.firebaseio.com/"
})
p_date = datetime.strftime(datetime.now(), "%Y-%m-%d")
p_time = datetime.strftime(datetime.now(), "%H_%M_%S")

# ref = db.reference('sensor1/'+p_date+'/'+p_time)
# ref.set({'temp': 7, 'humidity': 65})


# # print(ref.get())
# # data = ref.order_by_child('age').get()
# # print(data)

ref = db.reference('/')
sensors = list(ref.order_by_key().get().keys())
data = []
for sensor in sensors:
    current_date = list(ref.child(sensor).order_by_key().limit_to_last(1).get().keys())[0]
    #get last temp and humidity reading for each sensor
    last_temp_humidity = ref.child(sensor).child(current_date).order_by_key().limit_to_last(1).get()
    data.append({sensor: dict(last_temp_humidity)})
print(data)
