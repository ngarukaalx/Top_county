#!/usr/bin/python3
"""class county"""
import models
from models.base_model import BaseModel, Base
from models.subcounty import Subcounty
from models.user import User
import sqlalchemy
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship


class County(BaseModel, Base):
    """creates the table county"""
    __tablename__ = "counties";
    name = Column(String(128), nullable=False, unique=True)
    county_number = Column(Integer, nullable=False, unique=True)
    subcounties = relationship("Subcounty",
                               backref="county",
                               cascade="all, delete, delete-orphan")
    users = relationship("User",
            backref="county",
            cascade="all, delete, delete-orphan")
