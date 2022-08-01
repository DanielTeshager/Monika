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
CORS(app)
# Create secret key for session
# app.config.from_pyfile('config.py')
# app.secret_key = app.config['SECRET_KEY']
# CORS Headers
@app.after_request
def after_request(response):
    response.headers.add(
        "Access-Control-Allow-Headers", "Content-Type,Authorization,true"
    )
    response.headers.add(
        "Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS"
    )
    return response

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
  
    ref = db.reference('main_kitchen_chiller/'+p_date+'/')
    data = ref.order_by_child('H').get()
    temp = []
    humidity = []
    time = []
    for item in data:
        temp.append(data[item]['T'])
        humidity.append(data[item]['H'])
        time.append(item)
    d = {'temp': temp, 'humidity': humidity, 'time': time}
    return jsonify({'data': d})

# Create a URL route in our application for "/search"
@app.route('/search', methods=['GET', 'POST'])
def search():
    pass
# Auxillary function to get the data from the wikipedia API
@app.route('/lookup/<keyword>')
def lookup(keyword):
    pass

# Handles the page note found error
@app.errorhandler(404)
def not_found_error(error):
    return render_template('errors/404.html'), 404 

# Handles the internal server error
@app.errorhandler(500)
def not_found_error(error):
    return render_template('errors/500.html'), 500

if __name__ == '__main__':
    app.run(debug=True)