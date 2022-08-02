from flask import Flask, app, render_template, request, redirect, url_for, flash, jsonify
from flask_cors import CORS
import json
import requests
from tempfile import tempdir
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from datetime import datetime

# Create the application instance
app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "http://127.0.0.1:5501"}})


# # CORS Headers
# @app.after_request
# def after_request(response):
#     response.headers.add(
#         "Access-Control-Allow-Origin", "*"
#     )
#     # response.headers.add(
#     #     "Access-Control-Allow-Headers", "Content-Type,Authorization,true"
#     # )
#     # response.headers.add(
#     #     "Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS"
#     # )
   
#     return response

cred = credentials.Certificate('infinite-rope-685-firebase-adminsdk-5ej3i-b3da8557b2.json')
# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://infinite-rope-685.firebaseio.com/"
})
p_date = datetime.strftime(datetime.now(), "%Y-%m-%d")
p_time = datetime.strftime(datetime.now(), "%H_%M_%S")

# Create a URL route in our application for "/"
@app.route('/')
def index():
    # ref = db.reference('main_kitchen_chiller/'+p_date+'/')
    ref = db.reference('main_kitchen_chiller/2022-07-31/')
    data = ref.order_by_key().limit_to_last(10).get()
    temp = []
    humidity = []
    time = []
    for item in data:
        temp.append(data[item]['T'])
        humidity.append(data[item]['H'])
        time.append(item)
    d = {'temp': temp, 'humidity': humidity, 'time': time}
    return jsonify(d)

#return the laste temperature and humidity reading from the database
@app.route('/current_temp_humidity')
def current_temp_humidity():
    # ref = db.reference('main_kitchen_chiller/'+p_date+'/')
    ref = db.reference('main_kitchen_chiller/2022-07-31/')
    data = ref.order_by_key().limit_to_last(1).get()

    #convert the odict to a list
    data_dict = list(data.values())[0]
    print(data_dict)
    d = {'temp': data_dict['T'], 'humidity': data_dict['H'], 'time': list(data.keys())[0]}
    return jsonify(d)

# Handles the page note found error
@app.errorhandler(404)
def not_found_error(error):
    return render_template('errors/404.html'), 404 

# Handles the internal server error
@app.errorhandler(500)
def not_found_error(error):
    return render_template('errors/500.html'), 500

# catches all errors
@app.errorhandler(Exception)
def unhandled_exception(e):
    return render_template('errors/500.html'), 500

if __name__ == '__main__':
    app.run(debug=True)