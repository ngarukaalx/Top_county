#!/usr/bin/env python3
"""Holds the User class"""
import models
from models.base_model import BaseModel, Base
from models.profile import Profile
from models.image import Image
from models.video import Video
from models.textpost import Textpost
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class User(BaseModel, Base):
    """cretaes the user table"""
    __tablename__ = "users"
    county_id = Column(String(60), ForeignKey("counties.id"), nullable=False)
    subcounty_id = Column(String(60), ForeignKey("subcounties.id"), nullable=False)
    ward_id = Column(String(60), ForeignKey("wards.id"), nullable=False)
    user_name = Column(String(128), nullable=False)
    email = Column(String(128), unique=True, nullable=False)
    role = Column(String(128), nullable=True)
    password = Column(String(128), nullable=False)
    profile = relationship("Profile", backref="user", cascade="all, delete, delete-orphan")
    images = relationship("Image", backref="user", cascade="all, delete, delete-orphan")
    videos = relationship("Video", backref="user", cascade="all, delete, delete-orphan")
    textpost = relationship("Textpost", backref="user", cascade="all, delete, delete-orphan")
