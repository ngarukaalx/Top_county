#!/usr/bin/env python3
"""holds the textpost class"""
import models
from models.base_model import BaseModel
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Text
from sqlalchemy.orm import relationship

class Textpost(BaseModel, Base):
    """representaion of video"""
    __tablename__ = "videos"
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    description = Column(Text)
