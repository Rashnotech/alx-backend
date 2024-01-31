#!/usr/bin/env python3
"""a module that implement caching system"""
from base_caching import BaseCaching



class MRUCache(BaseCaching):
    """
    A class that inherits from parents and is a caching system
    """

    def __init__(self):
        """class initialization"""
        super().__init__()

    def put(self, key, item):
        """a method that assign to cache"""
        if not key or not item:
            return None
        self.cache_data[key] = item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            print('DISCARD: {}'.format())

    def get(self, key):
        """ a method that get value using key"""
        if not key or key not in self.cache_data.keys():
            return None
        return self.cache_data[key]
