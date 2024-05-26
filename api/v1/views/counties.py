#!/usr/bin/env python3
"""api end points for county"""
from models.county import County
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/counties', methods=['POST'], strict_slashes=False)
def create_county():
    """creates a county"""
    print("Am called")
    # check if request is of json format
    if not request.get_json():
        abort(400, description="Not a json")

    # check if name and number was provided
    if "name" not in request.get_json():
        abort(400, description="Missing name")

    if "county_number" not in request.get_json():
        abort(400, description="Missing county number")

    data = request.get_json()
    instance = County(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict())), 201


@app_views.route('/counties/<county_id>', methods=['DELETE'], strict_slashes=False)
def del_county(county_id):
    """delete a county by id"""
    county = storage.get(County, county_id)

    if not county:
        abort(404)
    storage.delete(county)
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route('/counties/<county_id>', methods=['GET'], strict_slashes=False)
def get_county(county_id):
    """get a county"""
    county = storage.get(County, county_id)

    if not county:
        abort(404)
    return jsonify(county.to_dict())

@app_views.route('/counties/<county_id>', methods=['PUT'], strict_slashes=False)
def update_county(county_id):
    """updates a county"""
    county = storage.get(County, county_id)

    if not county:
        abort(404)
    if not request.get_json():
        abort(404, description="Not a JSON")
    avoid = ['id', 'created_at', 'updated_at']
    data = request.get_json()
    for key, value in data.items():
        if key not in avoid:
            setattr(county, key, value)
    storage.save()
    return make_response(jsonify(county.to_dict()), 200)

@app_views.route('/counties', methods=['GET'], strict_slashes=False)
def all_county():
    """Retrives all counties"""
    all_counties = [ county.to_dict() for county in storage.all(County).values()]
    return jsonify(all_counties)
