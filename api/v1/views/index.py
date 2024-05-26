#!/usr/bin/env python3
"""Status of my api"""
from models import storage
from api.v1.views import app_views
from flask import jsonify, make_response, request, abort


@app_views.route('/status', methods=['GET'], strict_slashes=False)
def status():
    """status of API"""
    return jsonify({"Hali": "mambo inaenda"})


@app_views.route('/num/<cls>', methods=['GET'], strict_slashes=False)
def num(cls):
    """number of obj in a class"""
    if request.method == 'GET':
        user_count = storage.count(cls)
        return jsonify({cls: user_count}), 200
