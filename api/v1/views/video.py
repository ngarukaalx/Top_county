#!/usr/bin/env python3
"""Api points for profile"""
from models import storage
from models.video import Video
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/video/<usr_id>', methods=['POST'], strict_slashes=False)
def create_video(usr_id):
    """creates video for a use"""
    if not request.get_json():
        abort(400, description="Not a JSON")
    if 'url' not in request.get_json():
        abort(400, description="Missing url")
    if request.method == 'POST':
        data = request.get_json()
        instance = Video(**data)
        instance.user_id = usr_id
        instance.save()
        return make_response(jsonify(instance.to_dict())), 201


@app_views.route('/video/<vid_id>', methods=['DELETE'], strict_slashes=False)
def del_video(vid_id):
    """delete a video"""
    vid = storage.get(Video, vid_id)
    if not vid:
        abort(404)
    storage.delete(vid)
    storage.save()
    return make_response(jsonify({})), 200

@app_views.route('/video/<vid_id>', methods=['PUT'], strict_slashes=False)
def update_video(vid_id):
    """updates a video"""
    vid = storage.get(Video, vid_id)
    if not vid:
        abort(404)
    if request.method == 'PUT':
        avoid = ['id', 'created_at', 'updated_at']
        data = request.get_json()
        for key, value in data.items():
            if key not in avoid:
                setattr(vid, key, value)
        storage.save()
        return make_response(jsonify(vid.to_dict())), 200


@app_views.route('/video/<vid_id>', methods=['GET'], strict_slashes=False)
def gets_video(vid_id):
    """get a video by id"""
    video = storage.get(Video, vid_id)
    if not video:
        abort(404)
    return jsonify(video.to_dict())


@app_views.route('/video', methods=['GET'], strict_slashes=False)
def get_all_video():
    """get all videoss"""
    vid = [pro.to_dict() for pro in storage.all(Video).values()]
    if not vid:
        abort(404)
    return jsonify(vid)

@app_views.route('/videouser/<user_id>', methods=['GET'], strict_slashes=False)
def video_user(user_id):
    """get a video for a user"""
    vids = [pro.to_dict() for pro in storage.all(Video).values() if pro.user_id == user_id]
    return jsonify(vids)
