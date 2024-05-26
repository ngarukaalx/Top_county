#!/usr/bin/env python3
"""API endpoints for user"""
from models import storage
from models.user import User
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/user/<county_id>/<sub_id>/<ward_id>/', methods=['POST'], strict_slashes=False)
def create_user(county_id, sub_id, ward_id):
    """creaates a new user"""
    if not request.get_json():
        abort(400, description="Not JSON")
    if 'email' not in request.get_json():
        abort(400, description="Missing email")
    if 'password' not in request.get_json():
        abort(400, description="Missing password")

    data = request.get_json()
    instance = User(**data)
    instance.county_id = county_id
    instance.subcounty_id = sub_id
    instance.ward_id = ward_id
    instance.save()
    return make_response(jsonify(instance.to_dict())), 201


@app_views.route('/user/<user_id>', methods=['PUT'], strict_slashes=False)
def update_user(user_id):
    """updates a user"""
    user = storage.get(User, user_id)
    if not user:
        abort(404)
    if not request.get_json():
        abort(400, description="Not JSON")
    if request.method == 'PUT':
        data = request.get_json()
        skip = ['id', 'email', 'created_at', 'updated_at']
        for key, value in data.items():
            if key not in skip:
                setattr(user, key, value)
    storage.save()
    return make_response(jsonify(user.to_dict()), 200)

@app_views.route('/user/<user_id>', methods=['GET'], strict_slashes=False)
def get_user(user_id):
    """gets a user by id"""
    user = storage.get(User, user_id)
    if not user:
        abort(404)

    return jsonify(user.to_dict())

@app_views.route('/user', methods=['GET'], strict_slashes=False)
def get_users():
    """retrives all users"""
    users = [user.to_dict() for user in storage.all(User).values()]
    if not users:
        abort(404)
    return jsonify(users)

@app_views.route('/user/<user_id>', methods=['DELETE'], strict_slashes=False)
def del_user(user_id):
    """deletes a user"""
    user = storage.get(User, user_id)
    if not user:
        abort(404)
    storage.delete(user)
    storage.save()

    return make_response(jsonify({})), 201
