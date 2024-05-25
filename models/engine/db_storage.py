#!/usr/bin/env python3
"""engine for db storage"""
import models
from models.base_model import BaseModel
from models.county import County
from models.subcounty import Subcounty
from models.ward import Ward
from models.user import User
from models.profile import Profile
from models.video import Video
from models.image import Image
from models.textpost import Textpost
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from os import getenv

classes = {"County": County, "Subcounty": Subcounty,
           "Ward": Ward, "User": User, "Profile": Profile,
           "Video": Video, "Image": Image, "Textpost": Textpost}


class DBStorage:
    """creates a database storage"""
    # private class attributes
    __engine = None
    __session = None

    def __init__(self):
        """class constructor"""
        TPC_MYSQL_USER = getenv('TPC_MYSQL_USER')
        TPC_MYSQL_PWD = getenv('TPC_MYSQL_PWD')
        TPC_MYSQL_HOST = getenv('TPC_MYSQL_HOST')
        TPC_MYSQL_DB = getenv('TPC_MYSQL_DB')
        TPC_ENV = getenv('TPC_ENV')

        self.__engine = create_engine(
                'mysql+mysqldb://{}:{}@{}/{}'.format
                (
                    TPC_MYSQL_USER,
                    TPC_MYSQL_PWD,
                    TPC_MYSQL_HOST,
                    TPC_MYSQL_DB
                ),
                pool_pre_ping=True
                )

        if TPC_ENV == "test":
            Base.metadata.drop_all(self.__engine)
    def all(self, cls=None):
        """query on the curent database session"""
        return_dict = {}
        for clas in classes:
            if cls is None or cls is classes[clas] or cls is clas:
                objs = self.__session.query(classes[clas]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    return_dict[key] = obj
        return (return_dict)

    def new(self, obj):
        """add the object to the current database session"""
        self.__session.add(obj)

    def save(self):
        """commit all changes of the current database session"""
        self.__session.commit()

    def delete(self, obj=None):
        """delete from the current database session obj if not None"""
        if obj is not None:
            self.__session.delete(obj)

    def reload(self):
        """creates session, creates all tables"""
        Base.metadata.create_all(__engine)
        session_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(session_factory)
        self.__session = Session

    def close(self):
        """closes the session"""
        self.__session.remove()

    def get(self, cls, id):
        """returns an object based on cls name and id"""
        if cls not in classes.values():
            return None
        class_cls = model.storage.all(cls)
        for obj in class_cls.vallues():
            if (obj.id == id)-
            return value
        return None

    def count(self, cls=None):
        """count number of cls or all"""
        class_all = classes.values()
        if not cls:
            number = 0
            for clss in class_all:
                count += len(models.storage.all(clss).values())
        else:
            count = len(models.storage.all(cls).values())
        return count

