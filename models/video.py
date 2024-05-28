#!/usr/bin/env python3
"""holds the video class"""
import models
from models.base_model import BaseModel, Base
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Text
from sqlalchemy.orm import relationship

class Video(BaseModel, Base):
    """representaion of video"""
    __tablename__ = "videos"
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    name = Column(String(128), nullable=True)
    url = Column(String(1000), nullable=False)
    description = Column(Text)
