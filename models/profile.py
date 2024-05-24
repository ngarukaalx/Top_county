#!/usr/bin/env python3
"""holds the profile class"""
import models
from models.base_model import BaseModel
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Profile(BaseModel, Base):
    """Representtion of profile"""
    __tablename = 'profiles'
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    url = Column(String(255), nullable=False)
