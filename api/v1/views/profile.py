#!/usr/bin/env python3
"""Api points for profile"""
from models import storage
from models.profile import Profile
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/profile/<usr_id>', methods=['POST'], strict_slashes=False)
def create_profile(usr_id):
    """creates profile for a use"""
    if not request.get_json():
        abort(400, description="Not a JSON")
    if 'url' not in request.get_json():
        abort(400, description="Missing url")
    if request.method == 'POST':
        data = request.get_json()
        instance = Profile(**data)
        instance.user_id = usr_id
        instance.save()
        return make_response(jsonify(instance.to_dict())), 201


@app_views.route('/profile/<pro_id>', methods=['DELETE'], strict_slashes=False)
def del_profile(pro_id):
    """delete a profile"""
    profile = storage.get(Profile, pro_id)
    if not profile:
        abort(404)
    storage.delete(profile)
    storage.save()
    return make_response(jsonify({})), 200

@app_views.route('/profile/<pro_id>', methods=['PUT'], strict_slashes=False)
def update(pro_id):
    """updates a profile"""
    profile = storage.get(Profile, pro_id)
    if not profile:
        abort(404)
    if request.method == 'PUT':
        avoid = ['id', 'created_at', 'updated_at']
        data = request.get_json()
        for key, value in data.items():
            if key not in avoid:
                setattr(profile, key, value)
        storage.save()
        return make_response(jsonify(profile.to_dict())), 200


@app_views.route('/profile/<pro_id>', methods=['GET'], strict_slashes=False)
def get_profile(pro_id):
    """get a profile by id"""
    profile = storage.get(Profile, pro_id)
    if not profile:
        abort(404)
    return jsonify(profile.to_dict())


@app_views.route('/profile', methods=['GET'], strict_slashes=False)
def get_all():
    """get all profiles"""
    profiles = [pro.to_dict() for pro in storage.all(Profile).values()]
    if not profiles:
        abort(404)
    return jsonify(profiles)
