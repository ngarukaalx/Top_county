#!/usr/bin/env python3
"""Api points for profile"""
from models import storage
from models.image import Image
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/image/<usr_id>', methods=['POST'], strict_slashes=False)
def create_image(usr_id):
    """creates image for a use"""
    if not request.get_json():
        abort(400, description="Not a JSON")
    if 'url' not in request.get_json():
        abort(400, description="Missing url")
    if request.method == 'POST':
        data = request.get_json()
        instance = Image(**data)
        instance.user_id = usr_id
        instance.save()
        return make_response(jsonify(instance.to_dict())), 201


@app_views.route('/image/<img_id>', methods=['DELETE'], strict_slashes=False)
def del_image(img_id):
    """delete a image"""
    image = storage.get(Image, img_id)
    if not image:
        abort(404)
    storage.delete(image)
    storage.save()
    return make_response(jsonify({})), 200

@app_views.route('/image/<img_id>', methods=['PUT'], strict_slashes=False)
def update_image(img_id):
    """updates a image"""
    image = storage.get(Image, img_id)
    if not image:
        abort(404)
    if request.method == 'PUT':
        avoid = ['id', 'created_at', 'updated_at']
        data = request.get_json()
        for key, value in data.items():
            if key not in avoid:
                setattr(image, key, value)
        storage.save()
        return make_response(jsonify(image.to_dict())), 200


@app_views.route('/image/<img_id>', methods=['GET'], strict_slashes=False)
def gets_image(img_id):
    """get a image by id"""
    image = storage.get(Image, img_id)
    if not image:
        abort(404)
    return jsonify(image.to_dict())


@app_views.route('/image', methods=['GET'], strict_slashes=False)
def get_all_image():
    """get all images"""
    image = [pro.to_dict() for pro in storage.all(Image).values()]
    if not image:
        abort(404)
    return jsonify(image)

@app_views.route('/imageuser/<user_id>', methods=['GET'], strict_slashes=False)
def image_user(user_id):
    """get a image for a user"""
    images = [pro.to_dict() for pro in storage.all(Image).values() if pro.user_id == user_id]
    return jsonify(images)
