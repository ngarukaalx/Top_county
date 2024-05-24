#!/usr/bin/env python3
"""The subcounty class"""
import models
from models.base_model import BasModel, Base
from models.ward import Ward
from models.user import User
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Subcounty(BaseModel, Base):
    """creates the subcounty table"""
    __tablename__ = 'subcounties'
    county_id = Column(String(60), ForeignKey('counties.id'), nullable=False)
    name = Column(String(128), nullable=False)
    wards = relationship("Ward",
            backref="subcounty",
            cascade="all, delete, delete-orphan")
    users = relationship("User",
            backref="subcounty",
            cascade="all, delete, delete-orphan")
