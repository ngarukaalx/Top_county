#!/usr/bin/env python3
"""api end points for ward"""
from models.ward import Ward
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/ward/<sub_id>', methods=['POST'], strict_slashes=False)
def create_ward(sub_id):
    """creates a ward"""
    # check if request is of json format
    if not request.get_json():
        abort(400, description="Not a json")

    # check if name is provided
    if "name" not in request.get_json():
        abort(400, description="Missing name")

    data = request.get_json()
    instance = Ward(**data)
    instance.subcounty_id = sub_id
    instance.save()
    return make_response(jsonify(instance.to_dict())), 201


@app_views.route('/ward/<ward_id>', methods=['DELETE'], strict_slashes=False)
def del_ward(ward_id):
    """delete a ward by id"""
    ward = storage.get(Ward, ward_id)

    if not ward:
        abort(404)
    storage.delete(ward)
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route('/ward/<ward_id>', methods=['GET'], strict_slashes=False)
def get_ward(ward_id):
    """get a ward"""
    ward = storage.get(Ward, ward_id)

    if not ward:
        abort(404)
    return jsonify(ward.to_dict())

@app_views.route('/ward/<ward_id>', methods=['PUT'], strict_slashes=False)
def update_ward(ward_id):
    """updates a ward"""
    ward = storage.get(Ward, ward_id)

    if not ward:
        abort(404)
    if not request.get_json():
        abort(404, description="Not a JSON")
    avoid = ['id', 'created_at', 'updated_at']
    data = request.get_json()
    for key, value in data.items():
        if key not in avoid:
            setattr(ward, key, value)
    storage.save()
    return make_response(jsonify(ward.to_dict()), 200)

@app_views.route('/ward', methods=['GET'], strict_slashes=False)
def all_ward():
    """Retrives all wards"""
    all_ward = [ ward.to_dict() for ward in storage.all(Ward).values()]
    return jsonify(all_ward)
