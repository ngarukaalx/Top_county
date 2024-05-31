#!/usr/bin/env python3
"""Handles file uploads and retrival"""
from models import storage
from models.video import Video
from models.image import Image
from models.profile import Profile
from models.textpost import Textpost
from api.v1.views import app_views
from flask import Flask, abort, jsonify, make_response, request, current_app, send_from_directory
from werkzeug.utils import secure_filename
import uuid
from api.v1.app import app
import os

ALLOWED_IMAGE_EXTENSIONS = {'png', 'jpg', 'jpeg',}

ALLOWED_VIDEO_EXTENSIONS = {'mp4', 'mov', 'avi'}

@app_views.route('/uploads/<file_name>', methods=['GET'], strict_slashes=False)
def fetch_file(file_name):
    """loads from directory"""
    return send_from_directory(app.config['UPLOAD_FOLDER'], file_name)

def allowed_files(filename, allowed):
    """checks if a file is of allowed format"""
    return '.' in filename and \
                                    filename.rsplit('.', 1)[1].lower() in allowed

@app_views.route('/uploads', methods=['POST'], strict_slashes=False)
def upload_files():
    """uploads a video"""
    if 'UPLOAD_FOLDER' not in current_app.config:
        abort(500, description="Upload folder not configured")
    if request.method == 'POST':
        # create a unique file name
        file_name = str(uuid.uuid4())

        video = request.files.get('video')
        description = request.form.get('description')
        image = request.files.get('image')
        user_id = request.form.get('user_id')
        profile = request.files.get('profile')


        # abort if no user id provided
        if user_id == "undefined":
            abort(400, description="Missing userId")

        # checks if videofile is present
        if video and allowed_files(video.filename, ALLOWED_VIDEO_EXTENSIONS):
            video_name = secure_filename(video.filename)
            # join uuid generated str and video_name
            unique_path = f"{file_name}_{video_name}"
            # save to server
            video.save(os.path.join(app.config['UPLOAD_FOLDER'], unique_path))
            # save to database
            video_instance = Video(url=unique_path, user_id=user_id)
            if description:
                video_instance.description = description
            video_instance.save()
            return make_response(jsonify(video_instance.to_dict()), 201)

        if image and allowed_files(image.filename, ALLOWED_IMAGE_EXTENSIONS):
            image_name = secure_filename(image.filename)
            # join uuid str and image_name to create unique file name
            unique_image_path = f"{file_name}_{image_name}"
            # save to server folder
            image.save(os.path.join(app.config['UPLOAD_FOLDER'], unique_image_path))
            # save to database
            image_instance = Image(url=unique_image_path, user_id=user_id)
            # check if description was provided
            if description:
                image_instance.description = description
            image_instance.save()
            return make_response(jsonify(image_instance.to_dict()), 201)

        # checks if a post request is textpost
        if description and not image and not video:
            instance_text = Textpost(description=description)
            instance_text.user_id = user_id
            instance_text.save()
            return make_response(jsonify(instance_text.to_dict()), 201)

        # creates a profile
        if profile and allowed_files(profile.filename, ALLOWED_IMAGE_EXTENSIONS):
            profile_name = secure_filename(profile.filename)
            # join uuid str and filename to create unique file
            unique_profile_path = f"{file_name}_{profile_name}"
            # save to server
            profile.save(os.path.join(app.config['UPLOAD_FOLDER'], unique_profile_path))
            # save to database
            profile_instance = Profile(url=unique_profile_path, user_id=user_id)
            profile_instance.save()
            return make_response(jsonify(profile_instance.to_dict()), 201)

