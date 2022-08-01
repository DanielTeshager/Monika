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

ref = db.reference('main_kitchen_chiller/'+p_date+'/')
data = ref.order_by_child('H').get()
temp = []
humidity = []
time = []
for item in data:
    temp.append(data[item]['T'])
    humidity.append(data[item]['H'])
    time.append(item)


print(temp)
print(humidity)
print(time)