#!/user/bin/python3
"""flask appliaction"""
import os
from os import environ
from models import storage
from models.user import User
from api.v1.views import app_views
from flask import Flask, make_response, jsonify
from flask_cors import CORS
from flask_login import LoginManager

app = Flask(__name__)
app.config['SECRET_KEY'] = '0751220853'
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.register_blueprint(app_views)
login_manager = LoginManager(app)
app.debug = True

CORS(app, resources={r"/api/v1/*": {"origins": "*"}}, supports_credentials=True)


@app.errorhandler(404)
def not_found(error):
    """Error 404 when a rsource not found"""
    return make_response(jsonify({'Error': "Not found"}), 404)

@app.teardown_appcontext
def close_db(error):
    """Close storage"""
    storage.close()

@login_manager.user_loader
def load_user(user_id):
    """Get user obj by id"""
    return storage.get(User, user_id)


if __name__ == "__main__":
    """driver fuction"""
    host = environ.get("TPC_API_HOST")
    port = environ.get("TPC_API_PORT")

    if not host:
        host = '0.0.0.0'
    if not port:
        port = '5000'
    app.run(host=host, port=port, threaded=True)
