#!/usr/bin/env python3
"""api end points for subcounty"""
from models.subcounty import Subcounty
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/sub/<county_id>', methods=['POST'], strict_slashes=False)
def create_sub(county_id):
    """creates a subcounty"""
    # check if request is of json format
    if not request.get_json():
        abort(400, description="Not a json")

    # check if name is provided
    if "name" not in request.get_json():
        abort(400, description="Missing name")

    data = request.get_json()
    instance = Subcounty(**data)
    instance.county_id = county_id
    instance.save()
    return make_response(jsonify(instance.to_dict())), 201


@app_views.route('/sub/<sub_id>', methods=['DELETE'], strict_slashes=False)
def del_sub(sub_id):
    """delete a subcounty by id"""
    subcounty = storage.get(Subcounty, sub_id)

    if not subcounty:
        abort(404)
    storage.delete(subcounty)
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route('/sub/<sub_id>', methods=['GET'], strict_slashes=False)
def get_sub(sub_id):
    """get a subcounty"""
    subcounty = storage.get(Subcounty, sub_id)

    if not subcounty:
        abort(404)
    return jsonify(subcounty.to_dict())

@app_views.route('/sub/<sub_id>', methods=['PUT'], strict_slashes=False)
def update_sub(sub_id):
    """updates a subcounty"""
    subcounty = storage.get(Subcounty, sub_id)

    if not subcounty:
        abort(404)
    if not request.get_json():
        abort(404, description="Not a JSON")
    avoid = ['id', 'created_at', 'updated_at']
    data = request.get_json()
    for key, value in data.items():
        if key not in avoid:
            setattr(subcounty, key, value)
    storage.save()
    return make_response(jsonify(subcounty.to_dict()), 200)

@app_views.route('/sub', methods=['GET'], strict_slashes=False)
def all_sub():
    """Retrives all subcounties"""
    all_sub = [ sub.to_dict() for sub in storage.all(Subcounty).values()]
    return jsonify(all_sub)
