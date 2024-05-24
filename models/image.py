#!/usr/bin/env python3
"""holds the image class"""
import models
from models.base_model import BaseModel
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Text
from sqlalchemy.orm import relationship

class Image(BaseModel, Base):
    """representaion of image"""
    __tablename__ = "images"
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    name = Column(String(128), nullable=True)
    url = Column(String(1000), nullable=False)
    description = Column(Text)
