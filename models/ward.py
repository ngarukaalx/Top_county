#!/usr/bin/env python3
"""The class Ward"""
import models
from models.base_model import BaseModel, Base
from models.user import User
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Ward(BaseModel, Base):
    """creates the User table"""
    __tablename__ = 'wards'
    subcounty_id = Column(String(60), ForeignKey('subcounties.id'), nullable=False)
    name = Column(String(128), nullable=False)
    users = relationship("User", backref="ward", cascade="all, delete, delete-orphan")
