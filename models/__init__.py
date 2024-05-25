#!/usr/bin/env python3
"""initializes  models"""
from models.engine.db_storage import DBStorage
storage = DBStorage()

storage.reload()
