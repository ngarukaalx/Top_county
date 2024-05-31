#!/usr/bin/env python3
"""creates a Blueprint for our Api"""
from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')
from api.v1.views.index import *
from api.v1.views.counties import *
from api.v1.views.subcounties import *
from api.v1.views.ward import *
from api.v1.views.user import *
from api.v1.views.profile import *
from api.v1.views.video import *
from api.v1.views.image import *
from api.v1.views.uploads import *
