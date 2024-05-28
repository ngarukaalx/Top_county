#!/usr/bin/env python3
"""This module contains the basemodel that defines common
atribute of all class
"""
import uuid
from datetime import datetime
import sqlalchemy
import models
from sqlalchemy import Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

time = "%Y-%m-%dT%H:%M:%S.%f"


class BaseModel:
    """Defines all common atributes"""
    id = Column(String(60), primary_key=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)

    def __init__(self, *args, **kwargs):
        """initialize the BaseModel instance with id and timaestamps"""
        if kwargs:
            for key, value in kwargs.items():
                if key != "__class__":
                    setattr(self, key, value)
            if kwargs.get("created_at", None) and type(self.created_at) is str:
                self.created_at = datetime.strptime(kwargs["created_at"], time)
            else:
                self.created_at = datetime.utcnow()
            if kwargs.get("updated", None) and type(self.updated_at) is str:
                self.updated_at = datetime.strptime(kwargs["updated_at"], time)
            else:
                self.updated_at = datetime.utcnow()
            if kwargs.get("id", None) is None:
                self.id = str(uuid.uuid4())
        else:
            # to have a unique id for each model
            self.id = str(uuid.uuid4())
            self.created_at = datetime.utcnow()
            self.updated_at = datetime.utcnow()


    def __str__(self):
        """returns [class name] (id) self.dict"""
        return "[{:s}] ({:s}) {}".format(self.__class__.__name__, self.id, self.__dict__)


    def save(self):
        """updates the public instance atribute with current datetime"""
        self.updated_at = datetime.utcnow()
        models.storage.new(self)
        models.storage.save()

    def delete(self):
        """deletes the current instance from storage"""
        models.storage.delete(self)

    def to_dict(self):
        """returns a dictionary containing all keys/value of __dict_ instance"""
        instance_dict = self.__dict__.copy()

        if 'created_at' in instance_dict:
            instance_dict["created_at"] = instance_dict["created_at"].strftime(time)
        if 'updated_at' in instance_dict:
            instance_dict["updated_at"] = instance_dict["updated_at"].strftime(time)

        instance_dict["__class__"] = self.__class__.__name__

        # removes _sa_instance_state from dict if it exists
        if '_sa_instance_state' in instance_dict:
            print("removing _sa_instance_state")
            del instance_dict["_sa_instance_state"]
        if "password" in instance_dict:
            print("Hashed pass: {}".format(instance_dict['password']))
            del instance_dict["password"]

        return instance_dict
